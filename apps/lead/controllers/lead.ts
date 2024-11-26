import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import {
    sendResponse,
    createPassword,
    createFirebaseUser,
    sendEmail,
    EMAIL_HEADING,
} from "../../../libraries";
import {
    RESPONSE_TYPE,
    SUCCESS_MESSAGE,
    ERROR_MESSAGE,
} from "../../../constants";
import { LeadRepo } from "../models/lead";
import { AssignRepo } from "../models/AssignRepo";
import { ContractRepo } from "../../contracts/models/ContractRepo";
import { AdminRepo } from "../../admin-user/models/user";
import { FranchiseRepo } from "../../admin-user/models/franchise";
import { USER_TYPE, USER_STATUS, CONTRACT_STATUS } from "../../../interfaces";
import jwt from "jsonwebtoken";
import { CONFIG } from "../../../config";
import { createLeadResponse } from "../../../libraries";
import { TContractPayload } from "../../../types/contracts";
import { ZohoSignRepo } from "../../zoho-sign/models/zohosign";
import { TAddUser } from "../../../types/admin/admin-user";

export default class LeadController {
    static async convertLeadToProspect(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const id = get(req.body, "id", "");

            // get contract
            const existingContract = await new ContractRepo().get(id as number);
            if (existingContract) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            `Prospect ${ERROR_MESSAGE.EXISTS}`
                        )
                    );
            }

            const existingLead = await new LeadRepo().get(id as number);
            if (!existingLead) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            `Lead ${ERROR_MESSAGE.NOT_EXISTS}`
                        )
                    );
            }

            // if (existingLead.status === LeadStatus.CONVERTED) {
            //     return res.status(400).send(sendResponse(RESPONSE_TYPE.ERROR, ERROR_MESSAGE.ALREADY_CONVERTED));
            // }

            const user_id = get(req, "user_id", "");
            const payload = {
                firstName: existingLead.firstName,
                lastName: existingLead.lastName,
                nameForSearch: existingLead.firstName,
                email: existingLead.email,
                userName: existingLead.email,
                phoneNumber: existingLead.phoneNumber,
                password: "12345678",
                createdBy: `${user_id}`,
                role: 0,
                type: USER_TYPE.PROSPECT,
                status: USER_STATUS.ACTIVE,
                referBy: existingLead.referBy,
            };

            let templateId: "";
            const templates: any[] = await new ZohoSignRepo().getTemplates();

            console.log(templates);

            if (
                templates &&
                Array.isArray(templates) &&
                templates.length > 0 &&
                templates[0].templateId
            ) {
                templateId = templates[0].templateId;
            }

            const prospectData: TContractPayload = {
                status: CONTRACT_STATUS.ACTIVE,
                terminationDetails: null,
                payment: null,
                leadId: id,
                templateId: templateId,
                amount: existingLead.amount,
                signedDate: null,
                dueDate: new Date(),
                validity: {
                    to: new Date(),
                    from: new Date(),
                },
                notes: null,
                additionalInfo: "",
                logs: null,
                signedDocs: null,
                createdBy: Number(`${user_id}`),
            };

            const prospect = await new ContractRepo().create(prospectData);

            // const existingFranchise =
            //     await new FranchiseRepo().getFranchiseByEmail(payload.email);
            // if (existingFranchise) {
            //     return res
            //         .status(400)
            //         .send(
            //             sendResponse(
            //                 RESPONSE_TYPE.ERROR,
            //                 ERROR_MESSAGE.FRANCHISE_EXISTS
            //             )
            //         );
            // }

            const firebaseUser = await createFirebaseUser({
                email: payload.email,
                emailVerified: true,
                phoneNumber: payload.phoneNumber,
                password: payload.password,
                disabled: false,
            });

            if (!firebaseUser?.success) {
                return res
                    .status(400)
                    .send(sendResponse(RESPONSE_TYPE.ERROR, firebaseUser?.uid));
            }

            const token = jwt.sign(
                { email: payload.email },
                CONFIG.ACCESS_TOKEN_SECRET,
                { expiresIn: CONFIG.ACCESS_TOKEN_EXPIRATION }
            );

            const hashedPassword = await createPassword(payload.password);

            let normalUser: TAddUser = {
                firebaseUid: firebaseUser.uid,
                password: hashedPassword,
                firstName: payload.firstName,
                lastName: payload.lastName,
                nameForSearch: payload.nameForSearch,
                email: payload.email,
                userName: payload.userName,
                phoneNumber: payload.phoneNumber,
                type: USER_TYPE.PROSPECT,
                role: 0,
                referBy: undefined,
            };
            await new AdminRepo().create(normalUser);

            // const existingAllContract = await new ContractRepo().getAssociatedContractsByLeadId(existingContract.leadId as string);

            // const franchiseResponse = await new FranchiseeRepo().createFranchisee({
            //     userid: normalUser.id,
            //     franchiseAgreementSignedDate: null,
            //     name: existingLead.firstName,
            //     ownerName: `${existingLead.firstName} ${existingLead.lastName}`,
            //     contactEmail: existingLead.email,
            //     contactNumber: existingLead.phoneNumber,
            //     establishedDate: new Date,
            //     franchiseType: FranchiseType.FRANCHISE,
            //     regionId: null,
            //     isActive: false,
            //     contractIds: existingAllContract,
            //     activeContract: existingContract.id,
            // });

            // await new FranchiseLocationRepo().createFranchiseLocation({
            //     contactPhone: null,
            //     location: null,
            //     city: null,
            //     state: null,
            //     country: null,
            //     zipCode: null,
            //     franchiseeId: franchiseResponse.id,
            // });

            // await new LeadRepo().updateStatus(id, { status: LeadStatus.CONVERTED });

            // Send an link to user email with password token
            const passwordCreateLink = `${CONFIG.FRONTEND_URL}/create-password?token=${token}`;

            try {
                // const emailContent = await getEmailTemplate(
                //     EMAIL_TEMPLATE.NEW_FRANCHISE_CREATED,
                //     {
                //         leadName: `${existingLead.firstName} ${existingLead.lastName}`,
                //         leadEmail: existingLead.email,
                //         leadPhone: existingLead.phoneNumber,
                //         passwordCreateLink,
                //     }
                // );

                const emailContent = `Hi Your Lead converted into Prospect Now Add Your Organisation using link: https://tonguetingler.vercel.app/organization-setup?prospectId=${prospect.id} using password:123456`;

                const mailOptions = {
                    to: existingLead.email,
                    subject: EMAIL_HEADING.PROSPECT_GENERATED,
                    templateParams: {
                        heading: EMAIL_HEADING.PROSPECT_GENERATED,
                        description: emailContent,
                    },
                };

                await sendEmail(
                    mailOptions.to,
                    mailOptions.subject,
                    mailOptions.templateParams
                );
            } catch (emailError) {
                console.error("Error sending email:", emailError);
            }

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.PROSPECT_CREATED
                    )
                );
        } catch (err) {
            console.error(err);
            return res
                .status(500)
                .send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
        }
    }

    static async getLeadStatus(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> {
        try {
            const id = get(req.params, "id", "");
            const getAttributes = ["status"];
            const existingLead = await new LeadRepo().getLeadStatus(
                "id",
                id,
                getAttributes
            );

            if (isEmpty(existingLead)) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.NOT_EXISTS
                        )
                    );
            }

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        existingLead
                    )
                );
        } catch (err) {
            console.error(err);
            return res
                .status(500)
                .send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
        }
    }

    static async assignLeadToAdminUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> {
        try {
            const id = get(req.body, "id", "");
            const assignee = get(req.body, "assignedTo", {}); // Changed from assigneeArray to assignee
            const user_id = get(req, "user_id", "");

            const existingLead = await new LeadRepo().getLeadByAttr("id", id);
            if (isEmpty(existingLead)) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.NOT_EXISTS
                        )
                    );
            }

            const payload: any = {
                assignedTo: assignee.id,
                assignedBy: user_id,
                assignedDate: new Date(),
            };

            console.log("payloadpayloadpayloadpayload", payload);
            const updatedLead = await new AssignRepo().createOrUpdate(
                id,
                payload
            );

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPDATED,
                        updatedLead
                    )
                );
        } catch (err) {
            console.error(err);
            return res
                .status(500)
                .send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
        }
    }

    static async create(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> {
        try {
            const user_id = get(req, "user_id", "");
            const user_name = get(req, "user_name", "");
            const whereVal = get(req.body, "email", "");

            const existingLead = await new LeadRepo().getLeadByAttr(
                "email",
                whereVal
            );
            if (existingLead) {
                return res
                    .status(400)
                    .send(
                        sendResponse(RESPONSE_TYPE.ERROR, ERROR_MESSAGE.EXISTS)
                    );
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
            const { assign } = payload;

            if (assign != null) {
                const existingUser = await new AdminRepo().checkIfUserExist(
                    assign.assignedTo.id
                );
                if (!existingUser) {
                    return res
                        .status(400)
                        .send(
                            sendResponse(
                                RESPONSE_TYPE.ERROR,
                                `User Assigned to ${ERROR_MESSAGE.NOT_EXISTS}`
                            )
                        );
                }
                const existingassignedByUser =
                    await new AdminRepo().checkIfUserExist(
                        assign.assignedBy.id
                    );
                if (!existingassignedByUser) {
                    return res
                        .status(400)
                        .send(
                            sendResponse(
                                RESPONSE_TYPE.ERROR,
                                `User Assigned to ${ERROR_MESSAGE.NOT_EXISTS}`
                            )
                        );
                }
            }

            delete payload.assign;

            if (payload.referby) {
                const existingReferral =
                    await new AdminRepo().getByReferralCode(payload.referby);
                if (!existingReferral) {
                    return res
                        .status(404)
                        .send(
                            sendResponse(
                                RESPONSE_TYPE.ERROR,
                                `Referral code ${ERROR_MESSAGE.NOT_EXISTS}`
                            )
                        );
                }
            }

            const newLead = await new LeadRepo().create(payload);

            // Check and create assignment if 'assign' object is provided in the request body
            if (assign != null) {
                const assignPayload = {
                    assignedTo: assign.assignedTo.id,
                    assignedBy: assign.assignedBy.id,
                    assignedDate: assign.assignedDate,
                    leadId: newLead.id as number, // Reference the new lead's ID
                };

                // Create assignment in AssignRepo
                await new AssignRepo().create(assignPayload);
            }

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.CREATED,
                        newLead
                    )
                );
        } catch (err) {
            console.error(err);
            return res
                .status(500)
                .send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
        }
    }

    static async list(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> {
        try {
            const size = get(req.query, "size", 10);
            const skip = get(req.query, "skip", 1);
            const search = get(req.query, "search", "");
            const sorting = get(req.query, "sorting", "id DESC")
                .toString()
                .split(" ");

            const leadsList = await new LeadRepo().list({
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
                        leadsList
                    )
                );
        } catch (err) {
            console.error(err);
            return res
                .status(500)
                .send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
        }
    }

    static async update(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> {
        try {
            const user_id = get(req, "user_id", "");
            // const user_name = get(req, 'user_name', '');
            const id = get(req.params, "id", "");
            const payload = req.body;

            let getAttributes: any = ["*"];
            const whereName = "id";
            const whereVal = id;

            const existingLead = await new LeadRepo().getLeadByAttr(
                whereName,
                whereVal,
                getAttributes
            );
            if (isEmpty(existingLead)) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.NOT_EXISTS
                        )
                    );
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

            const { assign } = payload;
            delete payload.assign;

            const updatedLead = await new LeadRepo().update(id, {
                ...payload,
                updatedBy: user_id,
                // logs: updatedLogs
            });

            if (assign != null) {
                const existingUser = await new AdminRepo().checkIfUserExist(
                    assign.assignedTo.id
                );
                if (!existingUser) {
                    return res
                        .status(400)
                        .send(
                            sendResponse(
                                RESPONSE_TYPE.ERROR,
                                `User Assigned to ${ERROR_MESSAGE.NOT_EXISTS}`
                            )
                        );
                }
                const existingassignedByUser =
                    await new AdminRepo().checkIfUserExist(
                        assign.assignedBy.id
                    );
                if (!existingassignedByUser) {
                    return res
                        .status(400)
                        .send(
                            sendResponse(
                                RESPONSE_TYPE.ERROR,
                                `User Assigned to ${ERROR_MESSAGE.NOT_EXISTS}`
                            )
                        );
                }
            }

            if (assign != null) {
                const assignPayload = {
                    assignedTo: assign.assignedTo.id,
                    assignedBy: assign.assignedBy.id,
                    assignedDate: assign.assignedDate,
                };

                // Create assignment in AssignRepo
                await new AssignRepo().createOrUpdate(id, assignPayload);
            } else {
                await new AssignRepo().delete(id as number);
            }

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPDATED,
                        updatedLead
                    )
                );
        } catch (err) {
            console.error(err);
            return res
                .status(500)
                .send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
        }
    }

    static async get(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> {
        try {
            const id = get(req.params, "id", "");

            const existingLead = await new LeadRepo().getLeadByAttr("id", id);
            if (isEmpty(existingLead)) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.NOT_EXISTS
                        )
                    );
            }

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        createLeadResponse(existingLead)
                    )
                );
        } catch (err) {
            console.error(err);
            return res
                .status(500)
                .send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
        }
    }

    static async delete(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response> {
        try {
            const ids = get(req.body, "ids", []);
            if (!Array.isArray(ids) || ids.length === 0) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            "No IDs provided for deletion."
                        )
                    );
            }

            // Check if leads exist
            const existingLeads = await Promise.all(
                ids.map((id) => new LeadRepo().getLeadByAttr("id", id, ["*"]))
            );
            const nonExistentIds = ids.filter(
                (id, index) => !existingLeads[index]
            );

            if (nonExistentIds.length > 0) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            `Leads not found: ${nonExistentIds.join(", ")}`
                        )
                    );
            }

            // Proceed with deletion
            const deletedCount = await new LeadRepo().delete(ids);

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.DELETED,
                        { deletedCount }
                    )
                );
        } catch (err) {
            console.error(err);
            return res
                .status(500)
                .send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
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
                        leads
                    )
                );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}
