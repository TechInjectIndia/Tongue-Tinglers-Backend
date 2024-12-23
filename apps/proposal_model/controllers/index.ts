import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { ProposalModelRepo } from '../models';

export default class ProposalModelController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = get(req, 'user_id', 0);

            console.log(user_id);

            const payload = {
                ...req.body,
                createdBy: user_id,
                updatedBy: null,  // Initially null on creation
                createdAt: new Date(),
            };

            const proposalModel = await new ProposalModelRepo().create(payload);
            return res
                .status(201) // 201 Created
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.CREATED,
                        proposalModel
                    )
                );
        } catch (err) {
            console.error("Error:", err);
            return res.status(400).send({
                error: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async list(req: Request, res: Response, next: NextFunction) {
        try {
            const size = get(req.query, "size", 10);
            const skip = get(req.query, "skip", 0);
            const search = get(req.query, "search", "");
            const trashOnly = get(req.query, "trashOnly", "");
            const sorting = get(req.query, "sorting", "id DESC").toString().split(" ");

            const proposalModels = await new ProposalModelRepo().list({
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
                        proposalModels
                    )
                );
        } catch (err) {
            console.error("Error:", err);
            return res.status(400).send({
                error: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = parseInt(get(req, 'user_id'));
            if(isNaN(user_id)) throw Error('userId not passed or isNan')

            const id = parseInt(get(req.params, 'id'));
            if(isNaN(id)) throw Error('userId not passed or isNan')


            const updatePayload = {
                ...req.body,
                updatedBy: user_id,
                updatedAt: new Date(),
            };

            const proposalModel = await new ProposalModelRepo().update(id, updatePayload);
            if (!proposalModel) {
                return res.status(404).send({
                    error: ERROR_MESSAGE.NOT_EXISTS,
                });
            }

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPDATED,
                        proposalModel
                    )
                );
        } catch (err) {
            console.error("Error:", err);
            return res.status(400).send({
                error: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(get(req.params, 'id'));
            if(isNaN(id)) throw Error('userId not passed or isNan')
            const existingProposalModel = await new ProposalModelRepo().get(id);

            if (isEmpty(existingProposalModel)) {
                return res.status(404).send({
                    error: ERROR_MESSAGE.NOT_EXISTS,
                });
            }

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        existingProposalModel
                    )
                );
        } catch (err) {
            console.error("Error:", err);
            return res.status(400).send({
                error: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const ids = get(req.body, "ids", []);
            if (isEmpty(ids)) {
                return res.status(400).send({
                    error: "IDs array cannot be empty.",
                });
            }

            const deletedCount = await new ProposalModelRepo().delete(ids);
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.DELETED,
                        { deletedCount }
                    )
                );
        } catch (err) {
            console.error("Error:", err);
            return res.status(400).send({
                error: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}
