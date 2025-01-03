import { get } from "lodash";
import { BaseOptions } from "../interface/options";
import RepoProvider from "../../RepoProvider";
import { sendResponse } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE } from "../../../constants";
import { Request, Response } from "express";

export default class OptionsController {
    static async createOptions(req: Request, res: Response) {
        const payload:any = req?.body;
        const optionsDetail: BaseOptions = {
            ...payload,
        };
        const productDetails = await RepoProvider.optionsRepo.create(optionsDetail);
        return res.status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.CREATED,
                        productDetails,
                    ),
                );
    }
}