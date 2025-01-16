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
            const taxRate = await new TaxRateRepo().create(payload);
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
            let filtersData={}
            const page = get(req.query, "page", 1);
            const pageNumber = parseInt(page.toString());
            const limit = get(req.query, "limit", 10);
            const limitNumber = parseInt(limit.toString());
            const search = get(req.query, "search");
            const filters = get(req.query, "filters", {});
            if (typeof filters === 'string') {
                filtersData = JSON.parse(filters);
            }
            const taxRateData = await new TaxRateRepo().getAll(pageNumber, limitNumber, search.toString(), filtersData)
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