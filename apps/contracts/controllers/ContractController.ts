import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import {
    EMAIL_HEADING,
    EMAIL_TEMPLATE,
    getEmailTemplate,
    sendEmail,
    sendResponse,
} from "../../../libraries";
import {
    RESPONSE_TYPE,
    SUCCESS_MESSAGE,
    ERROR_MESSAGE,
} from "../../../constants";
import { ContractRepo } from "../models/ContractRepo";
import { LeadRepo } from "../../lead/models/lead";
import { TContractPayload } from "../../../types";
import { FranchiseeRepo } from "../../franchisee/models/FranchiseeRepo";
import { FranchiseLocationRepo } from "../../franchisee/models/FranchiseLocationRepo";
import {
    AddFranchiseePayload,
    FranchiseType,
} from "../../../interfaces/franchisee";
import { CampaignAdRepo } from "../../campaign/models";
import { AdminRepo } from "../../admin-user/models/user";
import { CONFIG } from "../../../config/environment";

export default class ContractController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const newContract: TContractPayload = req.body;
            if (newContract.leadId) {
                const leadExists = await new LeadRepo().get(newContract.leadId);
                if (!leadExists) {
                    return res.status(401).send({
                        message: "lead Not Exists",
                    });
                }
            }
            const contract = await new ContractRepo().create(newContract);
            return res
                .status(201)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.CREATED,
                        contract
                    )
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
            let sorting = get(req?.query, "sorting", "id DESC");
            sorting = sorting.toString().split(" ");

            const Products = await new ContractRepo().list({
                offset: skip as number,
                limit: size as number,
                search: search as string,
                sorting: sorting,
                trashOnly: trashOnly as string,
            });

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        Products
                    )
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
            const id = get(req.params, "id");
            const contract = await new ContractRepo().get(id);
            if (!contract) {
                return res
                    .status(404)
                    .send(
                        sendResponse(RESPONSE_TYPE.ERROR, "Contract not found")
                    );
            }
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        contract
                    )
                );
        } catch (error) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req.params, "id");
            const existingContract = await new ContractRepo().get(id);
            if (!existingContract) {
                return res
                    .status(404)
                    .send(
                        sendResponse(RESPONSE_TYPE.ERROR, "Contract not found")
                    );
            }

            const updatedContract = await new ContractRepo().update(
                id,
                req.body
            );
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPDATED,
                        updatedContract
                    )
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
                            "Invalid ids provided"
                        )
                    );
            }

            const deleted = await new ContractRepo().delete(ids);
            if (!deleted) {
                return res
                    .status(404)
                    .send(
                        sendResponse(RESPONSE_TYPE.ERROR, "Contracts not found")
                    );
            }
            return res
                .status(200)
                .send(
                    sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.DELETED)
                );
        } catch (error) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async convert(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req.body, "id", "");

            // get contract
            const existingContract = await new ContractRepo().get(id as string);


            console.log("contract");
            console.log(existingContract);
            
            
            const existingLead = await new LeadRepo().get(existingContract.leadId as string);

            console.log("lead");
            console.log(existingLead);


            const existingCampaign = await new CampaignAdRepo().get(
                existingLead.campaignId
            );

            console.log("existing campaign");
            console.log(existingCampaign);


            let AddFranchiseePayloa: AddFranchiseePayload = {
                userid: "1",
                name: existingLead.firstName + " " + existingLead.lastName,
                ownerName: existingLead.firstName + " " + existingLead.lastName,
                contactEmail: existingLead.email,
                contactNumber: existingLead.phoneNumber,
                establishedDate: new Date(),
                franchiseAgreementSignedDate: new Date(),
                franchiseType: FranchiseType.FRANCHISE,
                regionId: existingCampaign.regionId,
                contractIds: [],
                activeContract: "",
                isActive: false,
            };

            const franchiseResponse =
                await new FranchiseeRepo().createFranchisee(
                    AddFranchiseePayloa
                );

            await new FranchiseLocationRepo().createFranchiseLocation({
                contactPhone: null,
                location: null,
                city: null,
                state: null,
                country: null,
                zipCode: null,
                franchiseeId: franchiseResponse.id,
            });

            // await new LeadRepo().updateStatus(id, { status: LeadStatus.CONVERTED });

            // Send an link to user email with password token
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

                // const emailContent = `Hi Your Lead converted into Prospect Now Add Your Organisation using link: https://tonguetingler.vercel.app/organization-setup?prospectId=${prospect.id} using password:123456`;

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
}
