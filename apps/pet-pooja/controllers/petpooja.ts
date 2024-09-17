import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { PetPoojaRepo } from '../models/petpooja';
import { get } from "lodash";

export default class PetPoojaController {
    static async newOrderPlaced(req: Request, res: Response, next: NextFunction) {
        try {
            const franchiseId = get(req.body, 'franchiseId', '');
            const orderDetails = get(req.body, 'order_details', '');
            const orderFromPetPooja = await new PetPoojaRepo().savePetPoojaOrder(franchiseId as string);
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                    )
                );
        } catch (err) {
            console.log(err)
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async getInventory(req: Request, res: Response, next: NextFunction) {
        try {
            const existingFranchisee = await new PetPoojaRepo().getAllFranchise();

            // Api Call Pet Pooja
            // get single franchise inventory for prev day

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                    )
                );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}