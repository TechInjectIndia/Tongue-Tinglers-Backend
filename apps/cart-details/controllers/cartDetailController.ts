import { get } from "lodash";
import RepoProvider from "../../RepoProvider";
import { sendResponse } from "../../../libraries";
import { RESPONSE_TYPE } from "../../../constants";
import { Request, Response } from "express";

export default class CartDetailController {

    static async getCartDetailByUserId(req: Request, res: Response) {
        try {

            const user_id = get(req, "user_id", 0);
            const cartDetails = await RepoProvider.cartDetailRepo.getCartDetailByUserId(user_id);
            if (cartDetails) {
                return res.status(200).send(
                    sendResponse(RESPONSE_TYPE.SUCCESS, 'Cart details fetched successfully.', cartDetails)
                );
            } else {
                return res.status(404).send(
                    sendResponse(RESPONSE_TYPE.ERROR, 'Cart details not found.')
                );
            }

        } catch (error) {
            console.error(error);
            return res.status(500).send(
                sendResponse(RESPONSE_TYPE.ERROR, 'An error occurred while fetching products.'),
            );
        }
    }

}
