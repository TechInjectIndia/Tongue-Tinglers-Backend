import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { MenuRepo } from '../models/menu';
import { MenuCategoryRepo } from '../models/menu-category';
import { MenuCategoryMapRepo } from '../models/menu-category-map';

export default class MenuCategoryMapController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const createMenu = req?.body;
            const menuId = req?.body.menuId;
            const categoryId = req?.body.categoryId;

            const existingMenu = await new MenuRepo().get(menuId as number);
            const existingCategory = await new MenuCategoryRepo().get(categoryId as number);
            if (existingMenu && existingCategory) {
                const checkIfAlreadyLinked = await new MenuCategoryMapRepo().get(menuId as number, categoryId as number);
                if (!checkIfAlreadyLinked) {
                    const Menu = await new MenuCategoryMapRepo().create(createMenu);
                    return res
                        .status(200)
                        .send(
                            sendResponse(
                                RESPONSE_TYPE.SUCCESS,
                                SUCCESS_MESSAGE.CREATED,
                                Menu
                            )
                        );
                }

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
            console.log(err)
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const ids = get(req?.body, "ids", "");

            const Menu = await new MenuRepo().delete(ids);
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.DELETED,
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