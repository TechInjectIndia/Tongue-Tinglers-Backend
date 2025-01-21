import { NextFunction, Request, Response } from "express";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { get } from "lodash";
import { sendResponse } from "../../../libraries";
import TaxRateRepo from "../repos/TaxRateRepo";
// import { TaxRateRepo } from "../repos/TaxRateRepo";

export default class TaxRateController {

    static async create(req: Request, res: Response){
        try{
            const user_id = parseInt(get(req, 'user_id'));
            const payload = { ...req.body, createdBy: user_id };
            const taxRate = await new TaxRateRepo().create(payload, user_id);
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.CREATED,
                        taxRate
                    )
                );
        }catch(error){
            console.error("Error:", error);
            return res.status(500).send({
                message: error.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async update(req: Request, res: Response){
        try{
            const id = parseInt(get(req.params, 'id'));
            const user_id = parseInt(get(req, 'user_id'));
            const payload = { ...req.body, updatedBy: user_id };
            const updatedTaxRate = await new TaxRateRepo().update(id, payload);
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPDATED,
                        updatedTaxRate
                    )
                );
        }catch(error){
            console.error("Error:", error);
            return res.status(500).send({
                message: error.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async getById(req: Request, res: Response){
        try{
            const id = parseInt(get(req.params, 'id'));
            const taxRateData = await new TaxRateRepo().getById(id);
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        taxRateData
                    )
                );
        }catch(error){
            console.error("Error:", error);
            return res.status(500).send({
                message: error.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async getAll(req: Request, res: Response){
        try{
            let page = parseInt(<string>get(req.query, "page", "1"));
            if (isNaN(page)) page = 1;
            let limit = parseInt(<string>get(req.query, "limit", "10"));
            if (isNaN(limit)) limit = 10;
            const search = <string>get(req.query, "search", "");
            const filters = <string>get(req.query, "filters", "");

             let filterObj = {};
            if (filters) {
                try {
                    filterObj = JSON.parse(filters);
                } catch (error) {
                    return res
                        .status(400)
                        .send(
                            sendResponse(
                                RESPONSE_TYPE.ERROR,
                                "Invalid filter format. It should be a valid JSON string.",
                            ),
                        );
                }
            }
            const taxRateData = await new TaxRateRepo().getAll(page, limit, search, filterObj)
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        taxRateData
                    )
                );
        }catch(error){
            console.error("Error:", error);
            return res.status(500).send({
                message: error.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async delete(req: Request, res: Response){
        try{
            const id = parseInt(get(req.params, 'id'));
            const taxRateData = await new TaxRateRepo().delete(id);
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.DELETED,
                        taxRateData
                    )
                );
        }catch(error){
            console.error("Error:", error);
            return res.status(500).send({
                message: error.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}