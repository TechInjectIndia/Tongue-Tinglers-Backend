import { APIResponse } from "apps/common/models/Base";
import { CommissionTable } from "../model/CommmisionTable";
import { NextFunction, Request, Response } from "express";
import RepoProvider from "apps/RepoProvider";
import { sendResponse } from "libraries";
import {
    RESPONSE_TYPE,
    SUCCESS_MESSAGE,
    ERROR_MESSAGE,
} from "../../../constants";
import { get } from "lodash";
import { CommissionDetails } from "../interface/Commission";

export interface ICommissionController {
    create(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<APIResponse<CommissionTable>>;

    update(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<APIResponse<CommissionTable>>;

    getById(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<APIResponse<CommissionTable>>;

    delete(req: Request, res: Response, next: NextFunction): Promise<void>;

    getAll(req: Request, res: Response, next: NextFunction): Promise<void>;

    createMapEntry(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void>;

    updateMapEntry(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<APIResponse<null>>;

    searchCommission(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void>;

    getMappingsData(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void>;

    updateCommisionEntityStatus(
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void>;
}

// export const getAll = async (req: Request, res: Response) => {
//     try {
//         const data = await RepoProvider.commissionRepo.getAll();
//         res.send(data);
//     } catch (err) {
//         console.log(err);
//     }
// };

export default class commissionController {
    static async updateCommission(req: Request, res: Response) {
        try {
            const user_id: number = parseInt(get(req, "user_id", ""));
            if (isNaN(user_id)) throw Error("Missing user_id or isNaN");
            const { id } = req.params;

            if (!id || (id && Number.isNaN(parseInt(id)))) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            `Address ${ERROR_MESSAGE.ID_SHOULD_BE_NUMBER}`,
                        ),
                    );
            }
            let commission = { ...req.body };

            // const updateCommission = await RepoProvider.commissionRepo.update({id, commission})
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async createCommission(req: Request, res: Response) {
        try {
            const payload = req.body;
            console.log(payload, "payload");
            const user_id = parseInt(get(req.body, "user_id"));
            if (isNaN(user_id)) throw Error("Missing user_id or isNaN");

            const commission: CommissionDetails = {
                ...payload,
                createdBy: user_id,
            };

            const commissionDetails =
                await RepoProvider.commissionRepo.create(commission);

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        commissionDetails,
                    ),
                );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const id = parseInt(get(req.params, "id"));
            if (isNaN(id)) throw Error("Missing id or isNaN");
            console.log("****");
            console.log(id);

            const commissionDetails =
                await RepoProvider.commissionRepo.getById(id);
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        commissionDetails,
                    ),
                );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async getAllCommision(req: Request, res: Response) {
        try {
            // const page = parseInt(req.query.page.toString(), 0) || 1;
            // const limit = parseInt(req.query.limit.toString(), 10) || 10;
            // const search = (req.query.search as string) || ""; // For text
            // const filters = (req.query.filters as string) || "";
            // let filterObj = {};
            // if (filters) {
            //     try {
            //         filterObj = JSON.parse(filters);
            //     } catch (error) {
            //         return res
            //             .status(400)
            //             .send(
            //                 sendResponse(
            //                     RESPONSE_TYPE.ERROR,
            //                     "Invalid filter format. It should be a valid JSON string.",
            //                 ),
            //             );
            //     }
            // }

            const Commission: any = await RepoProvider.commissionRepo.getAll();
            return res.status(200).send(
                sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.FETCHED, {
                    ...Commission,
                }),
            );
        } catch (err) {}
    }
}
