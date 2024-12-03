import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import {
    sendResponse,
} from "../../../libraries";
import {
    RESPONSE_TYPE,
    SUCCESS_MESSAGE,
    ERROR_MESSAGE,
} from "../../../constants";
import RepoProvider from "../../RepoProvider";
import { FranchiseDetails } from "../../../interfaces";

export default class FranchiseController {
    static async createFranchise(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = req?.body;
            const user_id = get(req, "user_id", 0);

            const franchise: FranchiseDetails = {
                ...payload,
                createdBy: user_id,
            };


            const franchiseDetails = await RepoProvider.franchise.create(franchise);

            console.log("franchise", franchiseDetails);

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        franchiseDetails,
                    ),
                );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {

        try {
            const id = get(req.params, "id", 0);
            console.log(id);
            const franchiseDetails = await RepoProvider.franchise.getById(id);
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        franchiseDetails,
                    ),
                );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req.params, "id", 0);
            console.log(id);
            const franchise = await RepoProvider.franchise.getAll();
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        franchise,
                    ),
                );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}
