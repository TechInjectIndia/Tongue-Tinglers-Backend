import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';
import { sendResponse } from '../../../libraries';
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from '../../../constants';
import { ContractRepo } from '../models/ContractModel';
import { LeadRepo } from '../../lead/models/lead';
import { TContractPayload } from '../../../types';

export default class ContractController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const newContract: TContractPayload = req.body;
            if (newContract.leadId) {
                const leadExists = await new LeadRepo().get(newContract.leadId);
                if (!leadExists) {
                    return res.status(401).send({
                        message: "lead Not Exists",
                    });
                }
            }
            const contract = await new ContractRepo().create(newContract);
            return res.status(201).send(
                sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.CREATED, contract)
            );
        } catch (error) {
            console.log(error);
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

            const Products = await new ContractRepo().list({
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
                        Products
                    )
                );
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req.params, 'id');
            const contract = await new ContractRepo().get(id);
            if (!contract) {
                return res.status(404).send(
                    sendResponse(RESPONSE_TYPE.ERROR, 'Contract not found')
                );
            }
            return res.status(200).send(
                sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.FETCHED, contract)
            );
        } catch (error) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req.params, 'id');
            const existingContract = await new ContractRepo().get(id);
            if (!existingContract) {
                return res.status(404).send(
                    sendResponse(RESPONSE_TYPE.ERROR, 'Contract not found')
                );
            }

            const updatedContract = await new ContractRepo().update(id, req.body);
            return res.status(200).send(
                sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.UPDATED, updatedContract)
            );
        } catch (error) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const ids = get(req.body, 'ids');
            if (!Array.isArray(ids) || ids.length === 0) {
                return res.status(400).send(sendResponse(RESPONSE_TYPE.ERROR, 'Invalid ids provided'));
            }

            const deleted = await new ContractRepo().delete(ids);
            if (!deleted) {
                return res.status(404).send(sendResponse(RESPONSE_TYPE.ERROR, 'Contracts not found'));
            }
            return res.status(200).send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.DELETED));
        } catch (error) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}
