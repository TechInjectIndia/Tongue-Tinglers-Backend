import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse, uploadSingleFileToFirebase } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { MenuProductRepo } from '../models/menu-product';

export default class MenuProductController {
    static async upload(req: Request, res: Response, next: NextFunction) {
        try {
            const moduleName = 'menu-products'
            await uploadSingleFileToFirebase(req as any, moduleName as string)
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPLOADED,
                    )
                );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const createMenu = req?.body;
            let getAttributes: any = ['*'];
            const whereName = 'name'
            const whereVal = req?.body?.name;
            const existingMenu = await new MenuProductRepo().getMenuProductByAttr(whereName, whereVal, getAttributes);
            if (existingMenu) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.EXISTS
                        )
                    );
            }

            const Menu = await new MenuProductRepo().create(createMenu);
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.CREATED,
                        Menu
                    )
                );
        } catch (err) {
            console.log(err)
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async list(req: Request, res: Response, next: NextFunction) {
        try {
            const size = get(req?.query, "size", 10);
            const skip = get(req?.query, "skip", 1);
            const search = get(req?.query, "search", "");
            const trashOnly = get(req?.query, "trashOnly", "");
            let sorting = get(req?.query, "sorting", "id DESC");
            sorting = sorting.toString().split(" ");

            const Menus = await new MenuProductRepo().list({
                offset: skip as number,
                limit: size as number,
                search: search as string,
                sorting: sorting,
                trashOnly: trashOnly as string
            });

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        Menus
                    )
                );
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req?.params, "id", 0);

            let getAttributes: any = ['*'];
            const whereName = 'id'
            const whereVal = id;
            const existingMenu = await new MenuProductRepo().getMenuProductByAttr(whereName, whereVal, getAttributes);
            if (isEmpty(existingMenu)) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.NOT_EXISTS
                        )
                    );
            }

            const updateMenu = req?.body;
            delete updateMenu.id
            const Menu = await new MenuProductRepo().update(id as number, updateMenu);

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPDATED,
                        Menu
                    )
                );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req?.params, "id", 0);

            let getAttributes: any = ['*'];
            const whereName = 'id'
            const whereVal = id;
            const existingMenu = await new MenuProductRepo().getMenuProductByAttr(whereName, whereVal, getAttributes);

            if (isEmpty(existingMenu)) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.NOT_EXISTS
                        )
                    );
            }

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        existingMenu
                    )
                );
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const ids = get(req?.body, "ids", "");

            const Menu = await new MenuProductRepo().delete(ids);
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
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

}