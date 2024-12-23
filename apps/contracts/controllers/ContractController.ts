import {NextFunction, Request, Response} from "express";
import {get} from "lodash";
import {
    EMAIL_HEADING,
    EMAIL_TEMPLATE,
    getEmailTemplate,
    sendEmail,
    sendResponse,
} from "../../../libraries";
import {
    ERROR_MESSAGE,
    RESPONSE_TYPE,
    SUCCESS_MESSAGE,
} from "../../../constants";
import {ContractRepo} from "../models/ContractRepo";
import {LeadRepo} from "../../lead/models/lead";
import {TContractPayload} from "../../../types";

import {CampaignAdRepo} from "../../campaign/models";
import {CONFIG} from "../../../config/environment";
import {FRANCHISE_STATUS, FranchiseDetails,} from "../../../interfaces";
import RepoProvider from "../../RepoProvider";
import {
    COMMISSION_PAID_STATUS
} from "../../../database/schema/commission/CommissionAndEntityMappingTable";
import { sequelize } from "../../../config";

export default class ContractController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = parseInt(get(req, "user_id"));
            if(!user_id){
                throw Error('Missing user_id or isNaN');
            }
            const newContract: TContractPayload = req.body;
            if (newContract.leadId) {
                const leadExists = await new LeadRepo().get(newContract.leadId);
                if (!leadExists) {
                    return res.status(401).send({
                        message: "lead Not Exists",
                    });
                }
            }
            const contract = await new ContractRepo().create(newContract, user_id);
            return res
                .status(201)
                .send(
                    sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.CREATED,
                        contract)
                );
        }
        catch (error) {
            console.log(error);
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async list(req: Request, res: Response, next: NextFunction) {
        try {
            const size = get(req?.query, "size", 10);
            const skip = get(req?.query, "skip", 1);
            const search = get(req?.query, "search", "");
            const trashOnly = get(req?.query, "trashOnly", "");
            let sorting = get(req?.query, "sorting", "id DESC");
            sorting = sorting.toString().split(" ");

            const status = get(req.query, "status");

            const filters: any = {};
            if (status) filters.status = status;

            const Products = await new ContractRepo().list({
                offset: skip as number,
                limit: size as number,
                search: search as string,
                sorting: sorting,
                trashOnly: trashOnly as string,
                filters: filters,
            });

            return res
                .status(200)
                .send(
                    sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.FETCHED,
                        Products)
                );
        }
        catch (err) {
            console.log(err);
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(get(req.params, "id"));
            if (isNaN(id)) throw Error('Missing id or isNaN');

            const contract = await new ContractRepo().get(id);
            if (!contract) {
                return res
                    .status(404)
                    .send(sendResponse(RESPONSE_TYPE.ERROR,
                        "Contract not found"));
            }
            return res
                .status(200)
                .send(
                    sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.FETCHED,
                        contract)
                );
        }
        catch (error) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(get(req.params, "id"));
            if (isNaN(id)) throw Error('Missing id or isNaN');

            const existingContract = await new ContractRepo().get(id);
            if (!existingContract) {
                return res
                    .status(404)
                    .send(sendResponse(RESPONSE_TYPE.ERROR,
                        "Contract not found"));
            }

            const updatedContract = await new ContractRepo().update(id,
                req.body);
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPDATED,
                        updatedContract
                    )
                );
        }
        catch (error) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const ids = get(req.body, "ids");
            if (!Array.isArray(ids) || ids.length === 0) {
                return res
                    .status(400)
                    .send(sendResponse(RESPONSE_TYPE.ERROR,
                        "Invalid ids provided"));
            }

            const deleted = await new ContractRepo().delete(ids);
            if (!deleted) {
                return res
                    .status(404)
                    .send(sendResponse(RESPONSE_TYPE.ERROR,
                        "Contracts not found"));
            }
            return res
                .status(200)
                .send(sendResponse(RESPONSE_TYPE.SUCCESS,
                    SUCCESS_MESSAGE.DELETED));
        }
        catch (error) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async updateOrganization(req: Request, res: Response) {
        try {
            const id = parseInt(get(req.params, "id"));
            if (isNaN(id)) throw Error('Missing id or isNaN');

            const body = req.body;
            const organizationId = body.organizationId;

            const existingContract = await new ContractRepo().get(id);
            if (!existingContract) {
                return res
                    .status(500)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            "An error occurred while fetching products."
                        )
                    );
            } else {
                existingContract.organizationId = organizationId;
                await new ContractRepo().update(id, organizationId);
            }
        }
        catch (err) {
            return res
                .status(500)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.ERROR,
                        "An error occurred while fetching products."
                    )
                );
        }
    }

    static async convert(req: Request, res: Response, next: NextFunction) {
        const transaction = await sequelize.transaction(); // Start a transaction
        try {
            const id = get(req.body, "id", 0);
            const user_id = parseInt(get(req, "user_id"))
            const address = get(req.body, "address", null);
            const mappings = get(req.body, "mappings", []);

            // get contract
            const existingContract = await new ContractRepo().get(id, {transaction});

            const existingLead = await new LeadRepo().getLeadByAttr(
                "id",
                existingContract.leadId,
                {transaction}
            );

            const existingCampaign = await new CampaignAdRepo().get(
                existingLead.campaignId, {transaction}
            );

            const paymentId =
                existingContract.payment && existingContract.payment.length > 0
                    ? existingContract.payment[existingContract.payment.length -
                    1]
                        .paymentId
                    : null;
            const signId =
                existingContract.signedDocs &&
                existingContract.signedDocs.length > 0
                    ?
                    existingContract.signedDocs[existingContract.signedDocs.length -
                    1]
                        .docId
                    : null;

            const franchiseDetailsData: FranchiseDetails = {
                location: address,
                sm: [],
                createdBy: 1,
                updatedBy: null,
                deletedBy: null,
                pocName: existingLead.firstName + " " + existingLead.lastName,
                pocEmail: existingLead.email,
                pocPhoneNumber: existingLead.phoneNumber,
                users: [],
                regionId: existingCampaign.regionId,
                area: "",
                agreementIds: [paymentId],
                paymentIds: [String(signId)],
                status: FRANCHISE_STATUS.Active,
                establishedDate: new Date(),
                organizationId: existingContract.organizationId,
                affiliateId: 0,
            };

            console.log("franchise details");
            console.log(franchiseDetailsData);
            console.log("_____");

            const resData = await RepoProvider.franchise.create(
                franchiseDetailsData, user_id, {transaction});
            console.log("res", resData);

            const entries: any[] = [];

            for (const commission of mappings) {
                entries.push({
                    createdBy: 1,
                    franchiseId: resData.id,
                    commissionId: commission.commissionId,
                    organizationId: commission.organizationId,
                    status: COMMISSION_PAID_STATUS.PENDING,
                });
            }

            const result = await RepoProvider.commissionRepo.createMapEntities(
                entries,
                {transaction}
            );

            const passwordCreateLink = `${CONFIG.FRONTEND_URL}/create-password`;

            try {
                const emailContent = await getEmailTemplate(
                    EMAIL_TEMPLATE.NEW_FRANCHISE_CREATED,
                    {
                        leadName: `${existingLead.firstName} ${existingLead.lastName}`,
                        leadEmail: existingLead.email,
                        leadPhone: existingLead.phoneNumber,
                        passwordCreateLink,
                    }
                );

                const mailOptions = {
                    to: existingLead.email,
                    subject: EMAIL_HEADING.NEW_FRANCHISE_CREATED,
                    templateParams: {
                        heading: EMAIL_HEADING.NEW_FRANCHISE_CREATED,
                        description: emailContent,
                    },
                };

                await sendEmail(
                    mailOptions.to,
                    mailOptions.subject,
                    mailOptions.templateParams
                );
            }
            catch (emailError) {
                console.error("Error sending email:", emailError);
            }
            await transaction.commit(); // Commit the transaction
            return res
                .status(200)
                .send(
                    sendResponse(RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FRANCHISE_CREATED)
                );
        }
        catch (err) {
            console.error(err);
            await transaction.rollback(); 
            return res
                .status(500)
                .send({message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR});
        }
    }
}
