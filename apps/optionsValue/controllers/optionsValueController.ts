import { get } from "lodash";
import { BaseOptionsValue } from "../interface/optionValue";
import RepoProvider from "../../RepoProvider";
import { sendResponse } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE } from "../../../constants";
import { Request, Response } from "express";

export default class OptionsController {
    static async createOptionsValue(req: Request, res: Response) {
        const payload:any = req?.body;
        const optionsDetail: BaseOptionsValue = {
            ...payload,
        };
        const optionsValueDetail = await RepoProvider.optionsValueRepo.create(optionsDetail);
        return res.status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.CREATED,
                        optionsValueDetail,
                    ),
                );
    }

    static async getAllOptionsValue(req: Request, res: Response) {
        try {

            const optionsValue = await RepoProvider.optionsValueRepo.getAll();
            return res.status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        {
                            ...optionsValue,
                        }
                    ),
                );
        } catch (error) {
            console.error(error);
            return res.status(500).send(
                sendResponse(RESPONSE_TYPE.ERROR, 'An error occurred while fetching options.'),
            );
        }
    }
}