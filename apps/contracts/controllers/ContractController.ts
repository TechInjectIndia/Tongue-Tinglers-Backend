import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import {
    EMAIL_HEADING,
    EMAIL_TEMPLATE,
    getEmailTemplate,
    sendEmail,
    sendMail,
    sendResponse,
} from "../../../libraries";
import {
    ERROR_MESSAGE,
    RESPONSE_TYPE,
    SUCCESS_MESSAGE,
} from "../../../constants";
import { ContractRepo } from "../models/ContractRepo";
import { LeadRepo } from "../../lead/models/lead";
import { TContractPayload } from "../../../types";
import { ContractsPayload } from "../interface/Contract";
import { CampaignAdRepo } from "apps/campaign/models";
import { CONFIG, sequelize } from "config";
import {
    FRANCHISE_STATUS,
    FranchiseDetails,
} from "apps/franchise/interface/Franchise";
import RepoProvider from "apps/RepoProvider";
import { COMMISSION_PAID_STATUS } from "../../commission/model/CommissionEntityMappingTable";
import { PaymentReceivedMail } from "static/views/email/get-templates/PaymentReceivedMail";
import { getHandledErrorDTO, getSuccessDTO } from "apps/common/models/DTO";
import {adminUserRouter} from "../../user/api/user";
import {AdminRepo} from "../../user/models/user";
import {UserModel} from "../../user/models/UserTable";
import {USER_TYPE} from "../../user/interface/user";

export default class ContractController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = parseInt(get(req, "user_id"));
            if (!user_id) {
                throw Error("Missing user_id or isNaN");
            }
            const newContract: ContractsPayload = req.body;
            if (newContract.leadId) {
                const leadExists = await new LeadRepo().get(newContract.leadId);
                if (!leadExists) {
                    return res.status(401).send({
                        message: "lead Not Exists",
                    });
                }
            }
            newContract.createdBy = user_id;
            const contract = await new ContractRepo().create(
                newContract,
                user_id,
            );
            return res
                .status(201)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.CREATED,
                        contract,
                    ),
                );
        } catch (error) {
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
            let sorting = get(req?.query, "sorting", "id DESC"); //todo test id????
            sorting = sorting.toString().split(" ");

            const status = get(req.query, "status");
            const proposal = get(req.query, "proposal");
            const minPrice = get(req.query, "minPrice");
            const maxPrice = get(req.query, "maxPrice");
            const dueDate = get(req.query, "dueDate");
            const zohoTemplate = get(req.query, "zohoTemplate");
            const region = get(req.query, "region");
            const assignee = get(req.query, "assignee");
            const filters: any = {};
            if (status) filters.status = status;
            if (proposal) filters.proposal = proposal;
            if (minPrice) filters.minPrice = minPrice;
            if (maxPrice) filters.maxPrice = maxPrice;
            if (dueDate) filters.dueDate = dueDate;
            if (zohoTemplate) filters.zohoTemplate = zohoTemplate;
            if (region) filters.region = region;
            if (assignee) filters.assignee = assignee;
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
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        Products,
                    ),
                );
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(get(req.params, "id"));
            if (isNaN(id)) throw Error("Missing id or isNaN");

            const contract = await new ContractRepo().get(id);
            if (!contract) {
                return res
                    .status(404)
                    .send(
                        sendResponse(RESPONSE_TYPE.ERROR, "Contract not found"),
                    );
            }
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        contract,
                    ),
                );
        } catch (error) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(get(req.params, "id"));
            if (isNaN(id)) throw Error("Missing id or isNaN");

            const existingContract = await new ContractRepo().get(id);
            if (!existingContract) {
                return res
                    .status(404)
                    .send(
                        sendResponse(RESPONSE_TYPE.ERROR, "Contract not found"),
                    );
            }

            const updatedContract = await new ContractRepo().update(
                id,
                req.body,
            );
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPDATED,
                        updatedContract,
                    ),
                );
        } catch (error) {
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
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            "Invalid ids provided",
                        ),
                    );
            }

            const deleted = await new ContractRepo().delete(ids);
            if (!deleted) {
                return res
                    .status(404)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            "Contracts not found",
                        ),
                    );
            }
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.DELETED,
                    ),
                );
        } catch (error) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async updateOrganization(req: Request, res: Response) {
        try {
            const id = parseInt(get(req.params, "id"));
            if (isNaN(id)) throw Error("Missing id or isNaN");

            const body = req.body;
            const organizationId = body.organizationId;

            const existingContract = await new ContractRepo().get(id);
            if (!existingContract) {
                return res
                    .status(500)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            "An error occurred while fetching products.",
                        ),
                    );
            } else {
                existingContract.organizationId = organizationId;
                await new ContractRepo().update(id, organizationId);
            }
        } catch (err) {
            return res
                .status(500)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.ERROR,
                        "An error occurred while fetching products.",
                    ),
                );
        }
    }

    static async convert(req: Request, res: Response, next: NextFunction) {
        const transaction = await sequelize.transaction(); // Start a transaction
        try {
            const id = get(req.body, "id", 0);
            const user_id = parseInt(get(req, "user_id"));
            const address = get(req.body, "address", null);
            const mappings = get(req.body, "mappings", []);

            // Fetch related data
            const existingContract = await new ContractRepo().get(id);
            if (!existingContract) throw new Error("Contract not found");

            const existingLead = await new LeadRepo().getLeadByAttr(
                "id",
                existingContract.leadId?.id
            );
            if (!existingLead) throw new Error("Lead not found");

            const franchiseExists = await RepoProvider.franchise.exists(existingLead.email);
            if (franchiseExists) {
                return res.status(200).send(
                    sendResponse(RESPONSE_TYPE.ERROR, SUCCESS_MESSAGE.FRANCHISE_EXISTS)
                );
            }

            const existingCampaign = await new CampaignAdRepo().get(existingLead.campaignId?.id);
            if (!existingCampaign) throw new Error("Campaign not found");

            // Extract payment and signed document IDs
            const paymentId = existingContract.payment?.slice(-1)?.[0]?.paymentId || null;
            const signId = existingContract.signedDocs?.slice(-1)?.[0]?.docId || null;

            // Prepare franchise details
            const franchiseDetailsData: FranchiseDetails = {
                location: address,
                sm: [],
                createdBy: user_id,
                updatedBy: null,
                deletedBy: null,
                pocName: `${existingLead.firstName} ${existingLead.lastName}`,
                pocEmail: existingLead.email,
                pocPhoneNumber: existingLead.phoneNumber,
                users: [],
                regionId: existingCampaign.regionId,
                area: "",
                agreementIds: [paymentId],
                paymentIds: [String(signId)],
                status: FRANCHISE_STATUS.Active,
                establishedDate: new Date(),
                organizationId: existingContract.organizationId?.id || null,
                // affiliateId: 0,
                assignedUser: null,
            };

            console.log("Franchise Details:", franchiseDetailsData);

            // Create franchise
            const franchise = await RepoProvider.franchise.create(franchiseDetailsData, user_id);
            await UserModel.update(
                { type: USER_TYPE.ADMIN }, // Fields to update
                { where: { email:existingLead.email} } // Condition
            );

            // Prepare commission mapping entries
            const commissionEntries = mappings.map((commission: any) => ({
                createdBy: user_id,
                franchiseId: franchise.id,
                commissionId: commission.commissionId,
                organizationId: commission.organizationId,
                status: COMMISSION_PAID_STATUS.PENDING,
            }));

            // Create commission mappings
            await RepoProvider.commissionRepo.createMapEntities(commissionEntries);

            // Send email notification
            const passwordCreateLink = `${CONFIG.FRONTEND_URL}/create-password`;

            try {
                const emailContent = getEmailTemplate(EMAIL_TEMPLATE.NEW_FRANCHISE_CREATED, {
                    leadName: `${existingLead.firstName} ${existingLead.lastName}`,
                    leadEmail: existingLead.email,
                    leadPhone: existingLead.phoneNumber,
                    passwordCreateLink,
                });

                const mailDto = await new PaymentReceivedMail().getPayload({}, existingLead.email);
                await sendMail(mailDto);
            } catch (emailError) {
                console.error("Email Error:", emailError);
                throw new Error(`Error sending email: ${emailError.message}`);
            }

            // Commit the transaction and send success response
            await transaction.commit();
            return res.status(200).send(
                sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.FRANCHISE_CREATED)
            );
        } catch (error) {
            console.error("Error in convert function:", error);
            await transaction.rollback();
            return res.status(500).send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
        }
    }


    static async updatePartialContract(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const id = parseInt(get(req.params, "id"));
            const user_id = parseInt(get(req, "user_id"));
            if (isNaN(id)) throw Error("Missing id or isNaN");
            let payload = req.body;
            const updatedContract =
                await new ContractRepo().updatePartialContract(id, {
                    ...payload,
                    updatedBy: user_id,
                });
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPDATED,
                        updatedContract,
                    ),
                );
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
        }
    }
}
