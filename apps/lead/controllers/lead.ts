import {NextFunction, Request, Response} from "express";
import {get, isEmpty} from "lodash";
import {Op} from "sequelize";
import jwt from "jsonwebtoken";

import {
    RESPONSE_TYPE,
    SUCCESS_MESSAGE,
    ERROR_MESSAGE,
} from "../../../constants";
import {LeadRepo} from "../models/lead";
import {AssignRepo} from "../models/AssignRepo";

import {CONFIG, sequelize} from "config";
import {TUser, USER_STATUS, USER_TYPE} from "apps/user/interface/user";
import {ZohoSignRepo} from "apps/zoho-sign/models/zohosign";
import {
    CONTRACT_STATUS,
    ContractsPayload,
} from "apps/contracts/interface/Contract";
import {
    createFirebaseUser,
    createPassword,
    EMAIL_HEADING, sendEmail,
    sendMail,
    sendResponse,
} from "libraries";
import {AdminRepo} from "apps/user/models/user";
import {ContractRepo} from "apps/contracts/models/ContractRepo";
import {TAddUser} from "types";
import {CreateLeadMail} from "static/views/email/get-templates/CreateLeadMail";
import {
    LeadToProspectMail
} from "static/views/email/get-templates/LeadToProspectMail";
import RepoProvider from "../../RepoProvider";
import {parseLead} from "../parser/leadParser";

export default class LeadController {

    static async frontEnd(
        req: Request,
        res: Response,
    ): Promise<Response> {
        try {

            const whereVal = get(req.body, "email", "");

            const existingLead = await new LeadRepo().getLeadByAttr(
                "email",
                whereVal,
            );
            if (existingLead) {
                return res
                    .status(400)
                    .send(sendResponse(RESPONSE_TYPE.ERROR, ERROR_MESSAGE.EXISTS));
            }

            const payload = {
                ...req.body,
                createdBy: 1,
            };
            const {assign} = payload;

            if (assign != null) {
                const existingUser = await new AdminRepo().checkIfUserExist(
                    assign.assignedTo.id,
                );
                if (!existingUser) {
                    return res
                        .status(400)
                        .send(
                            sendResponse(
                                RESPONSE_TYPE.ERROR,
                                `User Assigned to ${ERROR_MESSAGE.NOT_EXISTS}`,
                            ),
                        );
                }
                const existingassignedByUser = await new AdminRepo().checkIfUserExist(
                    assign.assignedBy.id,
                );
                if (!existingassignedByUser) {
                    return res
                        .status(400)
                        .send(
                            sendResponse(
                                RESPONSE_TYPE.ERROR,
                                `User Assigned to ${ERROR_MESSAGE.NOT_EXISTS}`,
                            ),
                        );
                }
            }

            delete payload.assign;

            if (payload.referby) {
                const existingReferral = await new AdminRepo().getByReferralCode(
                    payload.referby,
                );
                if (!existingReferral) {
                    return res
                        .status(404)
                        .send(
                            sendResponse(
                                RESPONSE_TYPE.ERROR,
                                `Referral code ${ERROR_MESSAGE.NOT_EXISTS}`,
                            ),
                        );
                }
            }

            const newLead = await new LeadRepo().create(payload, 1);

            // Check and create assignment if 'assign' object is provided in the request body
            if (assign != null) {
                const assignPayload = {
                    assignedTo: assign.assignedTo.id,
                    assignedBy: assign.assignedBy.id,
                    assignedDate: assign.assignedDate,
                    leadId: newLead.id, // Reference the new lead's ID
                };

                // Create assignment in AssignRepo
                await new AssignRepo().create(assignPayload);
            }

            const mailDto = await new CreateLeadMail().getPayload({}, newLead.email);
            await sendMail(mailDto);

            return res
                .status(200)
                .send(
                    sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.CREATED, newLead),
                );
        } catch (err) {
            console.error(err);
            return res
                .status(500)
                .send({message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR});
        }
    }


    static async convertLeadToProspect(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        const transaction = await sequelize.transaction(); // Start a transaction
        try {
            const id = parseInt(get(req.body, "id"));
            const user_id = parseInt(get(req, "user_id"));

            if (isNaN(id)) throw new Error("Invalid or missing 'id'");
            if (isNaN(user_id)) throw new Error("Invalid or missing 'user_id'");

            // Check if the contract already exists
            const existingContract = await new ContractRepo().get(id);
            if (existingContract) {
                await transaction.commit();
                return res
                    .status(400)
                    .send(
                        sendResponse(RESPONSE_TYPE.ERROR, `Prospect ${ERROR_MESSAGE.EXISTS}`)
                    );
            }

            // Fetch the lead
            const existingLead = await new LeadRepo().get(id);
            if (!existingLead) {
                await transaction.rollback();
                return res
                    .status(400)
                    .send(
                        sendResponse(RESPONSE_TYPE.ERROR, `Lead ${ERROR_MESSAGE.NOT_EXISTS}`)
                    );
            }

            // Prepare user payload
            const payload = {
                firstName: existingLead.firstName,
                lastName: existingLead.lastName,
                nameForSearch: existingLead.firstName,
                email: existingLead.email,
                phoneNumber: existingLead.phoneNumber,
                password: "12345678",
                createdBy: user_id,
                role: 0,
                type: USER_TYPE.PROSPECT,
                status: USER_STATUS.ACTIVE,
                referBy: existingLead.referBy,
            };

            // Retrieve template ID
            const templates = await new ZohoSignRepo().getTemplates();
            const templateId = templates?.[0]?.templateId || "";

            // Prepare prospect data
            const prospectData: ContractsPayload = {
                organizationId: null,
                status: CONTRACT_STATUS.ACTIVE,
                terminationDetails: null,
                payment: null,
                leadId: id,
                templateId,
                amount: existingLead.amount,
                signedDate: null,
                dueDate: new Date(),
                validity: { to: new Date(), from: new Date() },
                notes: null,
                additionalInfo: "",
                signedDocs: [],
                createdBy: user_id,
                proposalData: existingLead.proposalModalId,
                assignedUser: null,
            };

            // Create Firebase user
            const firebaseUser = await createFirebaseUser({
                email: payload.email,
                emailVerified: true,
                phoneNumber: payload.phoneNumber,
                password: payload.password,
                disabled: false,
            });

            if (!firebaseUser?.success) {
                await transaction.rollback();
                return res
                    .status(400)
                    .send(sendResponse(RESPONSE_TYPE.ERROR, firebaseUser.error));
            }

            // Create user in the database
            const hashedPassword = await createPassword(payload.password);
            const user: TUser = {
                firebaseUid: firebaseUser.uid,
                password: hashedPassword,
                firstName: payload.firstName,
                lastName: payload.lastName,
                nameForSearch: payload.nameForSearch,
                email: payload.email,
                phoneNumber: payload.phoneNumber,
                type: payload.type,
                role: payload.role,
                referBy: payload.referBy,
                createdBy: user_id,
                profilePhoto: "",
                status: payload.status,
                cart: "",
                access_token: "",
                password_token: "",
                referralCode: "",
                refresh_token: "",
                updatedBy: null,
                deletedBy: null,
                lastLoginAt: null,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            };

            await new AdminRepo().create(user, { transaction });

            // Create prospect
            const prospect = await new ContractRepo().create(prospectData, user_id, { transaction });

            // Commit the transaction
            await transaction.commit();

            // Send email notification
            const mailDto = await  new LeadToProspectMail().getPayload(
                {
                    btnLink: `https://tonguetingler.com/organization-setup?prospectId=${prospect.id}`,
                },
                existingLead.email
            );
            await sendMail(mailDto);

            return res
                .status(200)
                .send(
                    sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.PROSPECT_CREATED)
                );
        } catch (error) {
            console.error("Error in convertLeadToProspect:", error);
            await transaction.rollback();
            return res.status(500).send({ message: error.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
        }
    }


    static async assignLeadToAdminUser(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        try {
            const id = get(req.body, "id", "");
            const assignee = get(req.body, "assignedTo", {}); // Changed from assigneeArray to assignee
            const user_id = get(req, "user_id", "");

            const existingLead = await new LeadRepo().getLeadByAttr("id", id);
            if (isEmpty(existingLead)) {
                return res
                    .status(400)
                    .send(sendResponse(RESPONSE_TYPE.ERROR, ERROR_MESSAGE.NOT_EXISTS));
            }

            const payload: any = {
                assignedTo: assignee.id,
                assignedBy: user_id,
                assignedDate: new Date(),
            };

            console.log("payloadpayloadpayloadpayload", payload);
            const updatedLead = await new AssignRepo().createOrUpdate(id, payload);

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPDATED,
                        updatedLead,
                    ),
                );
        } catch (err) {
            console.error(err);
            return res
                .status(500)
                .send({message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR});
        }
    }

    static async create(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        try {
            const user_id = parseInt(get(req, "user_id"));
            if (!user_id) {
                throw Error('Missing user_id or isNaN');
            }
            const whereVal = get(req.body, "email", "");

            const existingLead = await new LeadRepo().getLeadByAttr(
                "email",
                whereVal,
            );
            if (existingLead) {
                return res
                    .status(400)
                    .send(sendResponse(RESPONSE_TYPE.ERROR, ERROR_MESSAGE.EXISTS));
            }

            const payload = {
                ...req.body,
                createdBy: user_id,
                // logs: [{
                //     userDetails: {
                //         userName: user_name,
                //         id: user_id
                //     },
                //     events: 'Lead created',
                //     timeline: new Date(),
                // }],
            };
            const {assign} = payload;

            if (assign != null) {
                const existingUser = await new AdminRepo().checkIfUserExist(
                    assign.assignedTo.id,
                );
                if (!existingUser) {
                    return res
                        .status(400)
                        .send(
                            sendResponse(
                                RESPONSE_TYPE.ERROR,
                                `User Assigned to ${ERROR_MESSAGE.NOT_EXISTS}`,
                            ),
                        );
                }
                const existingassignedByUser = await new AdminRepo().checkIfUserExist(
                    assign.assignedBy.id,
                );
                if (!existingassignedByUser) {
                    return res
                        .status(400)
                        .send(
                            sendResponse(
                                RESPONSE_TYPE.ERROR,
                                `User Assigned to ${ERROR_MESSAGE.NOT_EXISTS}`,
                            ),
                        );
                }
            }

            delete payload.assign;

            if (payload.referby) {
                const existingReferral = await new AdminRepo().getByReferralCode(
                    payload.referby,
                );
                if (!existingReferral) {
                    return res
                        .status(404)
                        .send(
                            sendResponse(
                                RESPONSE_TYPE.ERROR,
                                `Referral code ${ERROR_MESSAGE.NOT_EXISTS}`,
                            ),
                        );
                }
            }

            const newLead = await new LeadRepo().create(payload, user_id);
            const mailDto =  await  new CreateLeadMail().getPayload({}, newLead.email);
            await sendMail(mailDto);

            // Check and create assignment if 'assign' object is provided in the request body
            if (assign != null) {
                const assignPayload = {
                    assignedTo: assign.assignedTo.id,
                    assignedBy: assign.assignedBy.id,
                    assignedDate: assign.assignedDate,
                    leadId: newLead.id, // Reference the new lead's ID
                };

                // Create assignment in AssignRepo
                await new AssignRepo().create(assignPayload);
            }

            return res
                .status(200)
                .send(
                    sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.CREATED, newLead),
                );
        } catch (err) {
            console.error(err);
            return res
                .status(500)
                .send({message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR});
        }
    }


    static async list(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        try {
            const size = get(req.query, "size", 10);
            const skip = get(req.query, "skip", 1);
            const search = get(req.query, "search", "");
            const sorting = get(req.query, "sorting", "id DESC")
                .toString()
                .split(" ");

            // Additional filters
            const status = get(req.query, "status");
            const source = get(req.query, "source");
            const campaign = get(req.query, "campaign");
            const region = get(req.query, "region");
            const state = get(req.query, "state");
            const date = get(req.query, "date");
            const assignee = get(req.query, "assignee");
            const followUpDate = get(req.query, "followUpDate");
            const affiliate = get(req.query, "affiliate");
            const minAmount = get(req.query, "minAmount");
            const maxAmount = get(req.query, "maxAmount");
            const quickActionFilter = get(req.query, "quickActionFilter");

            // Prepare filter object
            // Dynamic filter object
            const filters: any = {};
            if (status) filters.status = status;
            if (source) filters.source = source;
            if (region) filters.region = region;
            if (campaign) filters.campaign = campaign;
            if (date) filters.date = date;
            if (assignee) filters.assignee = assignee;
            if (affiliate) filters.affiliate = affiliate;
            if (minAmount) filters.minAmount = minAmount;
            if (maxAmount) filters.maxAmount = maxAmount;


            const leadsList = await new LeadRepo().list({
                offset: skip as number,
                limit: size as number,
                search: search as string,
                sorting: sorting,
                filters: filters,
            });

            console.log(leadsList)

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        leadsList,
                    ),
                );
        } catch (err) {
            console.error(err);
            return res
                .status(500)
                .send({message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR});
        }
    }

    static async update(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        try {
            const user_id = parseInt(get(req, 'user_id'));

            console.log('user_id', user_id);
            if (isNaN(user_id)) throw Error('userId not passed or isNan')

            // const user_name = get(req, 'user_name', '');

            const id = parseInt(get(req.params, 'id'));
            if (isNaN(id)) throw Error('id not passed or isNan')

            const payload = req.body;
            console.log('payload: ', payload);

            let getAttributes: any = ["*"];
            const whereName = "id";
            const whereVal = id;

            const existingLead = await new LeadRepo().getLeadByAttr(
                whereName,
                whereVal,
                getAttributes,
            );
            if (isEmpty(existingLead)) {
                return res
                    .status(400)
                    .send(sendResponse(RESPONSE_TYPE.ERROR, ERROR_MESSAGE.NOT_EXISTS));
            }

            // const updateLog: ITrackable = {
            //     userDetails: {
            //         userName: user_name || 'unknown',
            //         id: user_id || 'unknown'
            //     },
            //     events: `Lead updated`,
            //     timeline: new Date(),
            // };
            // const existingLogs = Array.isArray(existingLead.logs) ? existingLead.logs : [];
            // const updatedLogs = [...existingLogs, updateLog];


            const updatedLead = await new LeadRepo().update(id, {
                ...payload,
                updatedBy: user_id,
                // logs: updatedLogs
            },user_id);

            const finalLead = await new  LeadRepo().getLeadByAttr("id",id)

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPDATED,
                        finalLead,
                    ),
                );
        } catch (err) {
            console.error(err);
            return res
                .status(500)
                .send({message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR});
        }
    }

    static async get(
        req: Request,
        res: Response,
    ): Promise<Response> {
        try {
            const id = get(req.params, "id", "");

            const existingLead = await new LeadRepo().getLeadByAttr("id", id);

            if (isEmpty(existingLead)) {
                return res
                    .status(400)
                    .send(sendResponse(RESPONSE_TYPE.ERROR, ERROR_MESSAGE.NOT_EXISTS));
            }

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        existingLead,
                    ),
                );
        } catch (err) {
            console.error(err);
            return res
                .status(500)
                .send({message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR});
        }
    }

    static async delete(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<Response> {
        try {
            const ids = get(req.body, "ids", []);
            if (!Array.isArray(ids) || ids.length === 0) {
                return res
                    .status(400)
                    .send(
                        sendResponse(RESPONSE_TYPE.ERROR, "No IDs provided for deletion."),
                    );
            }

            // Check if leads exist
            const existingLeads = await Promise.all(
                ids.map((id) => new LeadRepo().getLeadByAttr("id", id, ["*"])),
            );
            const nonExistentIds = ids.filter(
                (id, index) => !existingLeads[index],
            );

            if (nonExistentIds.length > 0) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            `Leads not found: ${nonExistentIds.join(", ")}`,
                        ),
                    );
            }

            // Proceed with deletion
            const deletedCount = await new LeadRepo().delete(ids);

            return res.status(200).send(
                sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.DELETED, {
                    deletedCount,
                }),
            );
        } catch (err) {
            console.error(err);
            return res
                .status(500)
                .send({message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR});
        }
    }

    static async searchLead(req: Request, res: Response, next: NextFunction) {
        try {
            const size = get(req?.query, "size", 10);
            const skip = get(req?.query, "skip", 1);
            const search = get(req?.query, "search", "");
            let sorting = get(req?.query, "sorting", "id DESC");
            sorting = sorting.toString().split(" ");

            const leads = await new LeadRepo().searchLead({
                offset: skip as number,
                limit: size as number,
                search: search as string,
                sorting: sorting,
            });

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        leads,
                    ),
                );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}
