import {get} from "lodash";

import RepoProvider from "../../RepoProvider";
import {sendResponse} from "../../../libraries";
import {RESPONSE_TYPE} from "../../../constants";
import {Request, Response} from "express";

export default class CartProductController {

    static async createCartProduct(req: Request, res: Response) {
        try {
            const payload: any = req?.body;
            const user_id = get(req, "user_id", 0);
            const product = {
                ...payload,
                user_id: user_id,
            };
            const productDetails = await RepoProvider.cartProductRepo.create(product);
            return res.status(201).send(
                sendResponse(RESPONSE_TYPE.SUCCESS, 'Cart products created successfully.', productDetails)
            );
        } catch (error) {
            console.error(error);
            return res.status(500).send(
                sendResponse(RESPONSE_TYPE.ERROR, 'An error occurred while fetching products.'),
            );
        }
    }

    static async updateQuantity(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 0);
            const payload: any = req?.body;
            payload.id = id
            const productDetails = await RepoProvider.cartProductRepo.updateQuantity(payload);
            return res.status(201).send(
                sendResponse(RESPONSE_TYPE.SUCCESS, 'Cart products updated successfully.', productDetails)
            );
        } catch (error) {
            console.error(error);
            return res.status(500).send(
                sendResponse(RESPONSE_TYPE.ERROR, 'An error occurred while fetching products.'),
            );
        }
    }

    static async deleteCartProduct(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id, 0);
            const productDetails = await RepoProvider.cartProductRepo.delete(id);
            return res.status(201).send(
                sendResponse(RESPONSE_TYPE.SUCCESS, 'Cart products deleted successfully.', productDetails)
            );
        } catch (error) {
            console.error(error);
            return res.status(500).send(
                sendResponse(RESPONSE_TYPE.ERROR, 'An error occurred while fetching products.'),
            );
        }
    }

    static async getCartById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const productDetails = await RepoProvider.cartProductRepo.getCartById(id);
            return res.status(201).send(
                sendResponse(RESPONSE_TYPE.SUCCESS, 'Cart products fetched successfully.', productDetails)
            );
        } catch (error) {
            console.error(error);
            return res.status(500).send(
                sendResponse(RESPONSE_TYPE.ERROR, 'An error occurred while fetching products.'),
            );
        }
    }

}
