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

    static async getAgreementDoc(req: Request, res: Response) {
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
}
