import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { MenuProductRepo } from '../models/menu-product';
import { MenuCategoryRepo } from '../models/menu-category';
import { MenuProductMapRepo } from '../models/menu-product-map';

export default class MenuProductCategoryMapController {
    static async assign(req: Request, res: Response, next: NextFunction) {
        try {
            const productId = req?.body.productId;
            const categoryId = req?.body.categoryId;
            
            const existingProduct = await new MenuProductRepo().get(productId as number);
            const existingCategory = await new MenuCategoryRepo().get(categoryId as number);
            if (existingProduct && existingCategory) {
                await new MenuProductMapRepo().assign(productId as number, categoryId as number);
                return res
                    .status(200)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.SUCCESS,
                            SUCCESS_MESSAGE.ASSIGNED,
                        )
                    );
            }
            return res
                .status(400)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.ERROR,
                        'Something Went Wrong!'
                    )
                );
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async unassign(req: Request, res: Response, next: NextFunction) {
        try {
            const productId = req?.body.productId;

            const Menu = await new MenuProductMapRepo().unassign(productId as number);
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UNASSIGNED,
                        Menu
                    )
                );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}