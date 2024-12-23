import { Request, Response, NextFunction } from 'express';
import TaxRepo from '../models/TaxRepo';
import { sendResponse } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import {get} from "lodash";

class TaxController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const tax = await TaxRepo.createTax(req.body);
            return res.status(201).send(tax);
        } catch (error) {
            console.log(error)
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(get(req.params, "id"));
            if(isNaN(id)) throw Error("id not passed or isNan")
            const tax = await TaxRepo.getTaxById(id);
            if (!tax) {
                return res.status(404).send(sendResponse(RESPONSE_TYPE.ERROR, 'Tax not found'));
            }
            return res.status(200).send(tax);
        } catch (error) {
            console.log(error)
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const taxes = await TaxRepo.getAllTaxes();
            return res.status(200).send(taxes);
        } catch (error) {
            console.log(error)
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(get(req.params, "id"));
            if(isNaN(id)) throw Error("id not passed or isNan")

            const [updatedCount, updatedTaxes] = await TaxRepo.updateTax(id, req.body);
            if (updatedCount === 0) {
                return res.status(404).send(sendResponse(RESPONSE_TYPE.ERROR, 'Tax not found'));
            }
            return res.status(200).send(updatedTaxes[0]);
        } catch (error) {
            console.log(error)
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(get(req.params, "id"));
            if(isNaN(id)) throw Error("id not passed or isNan")
            const deletedCount = await TaxRepo.deleteTax(id);
            if (deletedCount === 0) {
                return res.status(404).send(sendResponse(RESPONSE_TYPE.ERROR, 'Tax not found'));
            }
            return res.status(204).send();
        } catch (error) {
            console.log(error)
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}

export default TaxController;
