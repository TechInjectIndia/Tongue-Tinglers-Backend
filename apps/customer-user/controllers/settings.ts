import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { TEditSettings, TEditUserProfile } from "../../../types";
import { sendResponse } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { CustomerSettingsRepo } from '../models/settings';

export default class SettingsController {
    
    // public async editSettings(
    //     id: number,
    //     data: TEditUserProfile
    // ): Promise<[affectedCount: number]> {
    //     return await new CustomerSettingsRepo().editSettings(data, {
    //         where: {
    //             id,
    //         },
    //     });
    // }

    // static async getSettings(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const id = get(req?.params, "id", 0);
    //         const existingFranchisee = await new Admin().get(id as number);

    //         if (isEmpty(existingFranchisee)) {
    //             return res
    //                 .status(400)
    //                 .send(
    //                     sendResponse(
    //                         RESPONSE_TYPE.ERROR,
    //                         ERROR_MESSAGE.NOT_EXISTS
    //                     )
    //                 );
    //         }

    //         return res
    //             .status(200)
    //             .send(
    //                 sendResponse(
    //                     RESPONSE_TYPE.SUCCESS,
    //                     SUCCESS_MESSAGE.FETCHED,
    //                     existingFranchisee
    //                 )
    //             );
    //     } catch (err) {
    //         return res.status(500).send({
    //             message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
    //         });
    //     }
    // }

    // static async editSettings(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const id = get(req, "user_id", 0);
    //         const full_name = get(req?.body, "full_name", "");
    //         const contact_number = get(req?.body, "contact_number", "");
    //         const phone_code = get(req?.body, "phone_code", "");
    //         const address = get(req?.body, "address", "");

    //         let payload: TEditSettings = {
    //             full_name,
    //             contact_number,
    //             phone_code,
    //             address,
    //         };

    //         await new Admin().editSettings(id, payload);

    //         return res
    //             .status(200)
    //             .send(
    //                 sendResponse(
    //                     RESPONSE_TYPE.SUCCESS,
    //                     SUCCESS_MESSAGE.UPDATED
    //                 )
    //             );
    //     } catch (err) {
    //         return res.status(500).send({
    //             message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
    //         });
    //     }
    // }
}
