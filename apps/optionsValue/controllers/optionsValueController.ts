import { get } from "lodash";
import { BaseOptionsValue } from "../../../interfaces/optionsValue";
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
        const optionsValueDetail = await RepoProvider.optionsRepo.create(optionsDetail);
        return res.status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.CREATED,
                        optionsValueDetail,
                    ),
                );
    }
}