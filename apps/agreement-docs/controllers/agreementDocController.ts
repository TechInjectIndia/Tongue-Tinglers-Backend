import { createLeadResponse } from './../../../libraries/format-response';
import { AgreementDocRepo } from './../repos/agreementDocRepo';
import { sendResponse } from './../../../libraries/handleError';
import { get } from "lodash";
import { ERROR_MESSAGE, RESPONSE_TYPE, SUCCESS_MESSAGE } from "./../../../constants/response-messages";
import { Request, Response } from "express";
import RepoProvider from "../../RepoProvider"

export default class AgreementDocController {
    static async createAgreementDoc(req: Request, res: Response) {
        try {
            const id = get(req, "user_id", "1");
            if (!id) {
                throw Error("Missing user_id or isNaN");
            }
            const user_id = parseInt(id);
            if (isNaN(user_id)) throw Error("Missing user_id or isNaN");
            const payload = req.body;
            payload.createdBy = user_id;
            
            const agreementDocCreated = await RepoProvider.agreementDocRepo.createAgreementDoc(payload);
            if(!agreementDocCreated){
                return res.status(500).send({
                    message: ERROR_MESSAGE.AGREEMENT_DOC_NOT_CREATED,
                    payload: payload
                });
            }
            return res.status(200)
            .send(
                sendResponse(
                    RESPONSE_TYPE.SUCCESS,
                    SUCCESS_MESSAGE.CREATED,
                    agreementDocCreated,
                ),
            );
            

        } catch (error) {
            console.error("Error:", error);
            return res.status(500).send({
                message: error.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async getAgreementDocById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            if (!id) {
                throw Error("Missing id or isNaN");
            }
            if (isNaN(id)) throw Error("Missing id or isNaN");
            
            const agreementDoc = await RepoProvider.agreementDocRepo.getAgreementDocById(id);
            if(!agreementDoc){
                return res.status(500).send({
                    message: ERROR_MESSAGE.AGREEMENT_DOC_NOT_FOUND,
                });
            }
            return res.status(200)
            .send(
                sendResponse(
                    RESPONSE_TYPE.SUCCESS,
                    SUCCESS_MESSAGE.FETCHED,
                    agreementDoc,
                ),
            );
        } catch (error) {
            console.error("Error:", error);
            return res.status(500).send({
                message: error.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async getAgreementDoc(req: Request, res: Response) {
        try{
            const { entity_id, entity_type } = req.query; // Get the parameters from the query string

             // Ensure entity_id and entity_type are strings
            if (typeof entity_id !== "string" || typeof entity_type !== "string") {
                return res.status(400).send({
                    message: "Invalid parameters: entity_id and entity_type must be strings.",
                });
            }

            const entityId = parseInt(entity_id);
            if (isNaN(entityId)) {
                throw new Error("Invalid entity_id. It must be a number.");
            }

            const agreementDoc = await RepoProvider.agreementDocRepo.getAgreementDoc(entityId, entity_type);
            if(!agreementDoc){
                return res.status(500).send({
                    message: ERROR_MESSAGE.AGREEMENT_DOC_NOT_FOUND,
                });
            }
            return res.status(200)
            .send(
                sendResponse(
                    RESPONSE_TYPE.SUCCESS,
                    SUCCESS_MESSAGE.FETCHED,
                    agreementDoc,
                ),
            );
        }catch(error){
            console.error("Error:", error);
            return res.status(500).send({
                message: error.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async getAllAgreementDoc(req: Request, res: Response) {
        try {
            const { page, limit } = req.query;
            if (typeof page !== "string" || typeof limit !== "string") {
                return res.status(400).send({
                    message: "Invalid parameters: page and limit must be strings.",
                });
            }
            const pageInt = parseInt(page);
            const limitInt = parseInt(limit);

            const agreementDoc = await RepoProvider.agreementDocRepo.getAllAgreementDoc(pageInt, limitInt);
            if(!agreementDoc){
                return res.status(500).send({
                    message: ERROR_MESSAGE.AGREEMENT_DOC_NOT_FOUND,
                });
            }
            return res.status(200)
            .send(
                sendResponse(
                    RESPONSE_TYPE.SUCCESS,
                    SUCCESS_MESSAGE.FETCHED,
                    agreementDoc,
                ),
            );
        } catch (error) {
            console.error("Error:", error);
            return res.status(500).send({
                message: error.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async updateAgreementDoc(req: Request, res: Response) {
        try {
            const id = get(req, "user_id", "1");
            if (!id) {
                throw Error("Missing user_id or isNaN");
            }
            const user_id = parseInt(id);
            if (isNaN(user_id)) throw Error("Missing user_id or isNaN");
            const payload = req.body;
            payload.updatedBy = user_id;
            const agreementDoc = await RepoProvider.agreementDocRepo.updateAgreementDoc(payload);
            if(!agreementDoc){
                return res.status(500).send({
                    message: ERROR_MESSAGE.AGREEMENT_DOC_NOT_UPDATED,
                });
            }
            return res.status(200)
            .send(
                sendResponse(
                    RESPONSE_TYPE.SUCCESS,
                    SUCCESS_MESSAGE.UPDATED,
                    agreementDoc,
                ),
            );
        } catch (error) {
            console.error("Error:", error);
            return res.status(500).send({
                message: error.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}
