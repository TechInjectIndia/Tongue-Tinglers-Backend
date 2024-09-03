import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { LeadRepo } from '../models/lead';
import { LEAD_SOURCE } from '../../../interfaces';

export default class LeadController {

    static async getLeadStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req?.params, "id", "");
            let getAttributes: any = ['status'];
            const whereName = 'id'
            const whereVal = id;
            const existingLead = await new LeadRepo().getLeadStatus(whereName, whereVal, getAttributes);

            if (isEmpty(existingLead)) {
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
                        existingLead
                    )
                );
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async assignLeadToAdminUser(req: Request, res: Response, next: NextFunction) {
        try {
            // check if user id assinegd by and assigned to is user
            // add details in logs
            const id = get(req?.body, "id", "");
            const assignedBy = get(req, "user_id", "");
            const assignedTo = get(req?.body, "assignedTo", "");

            let getAttributes: any = ['*'];
            const whereName = 'id'
            const whereVal = id;
            const existingLead = await new LeadRepo().getLeadByAttr(whereName, whereVal, getAttributes);

            if (isEmpty(existingLead)) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.NOT_EXISTS
                        )
                    );
            }

            const assignLead: any = {};
            assignLead.assignedBy = assignedBy
            assignLead.assignedTo = assignedTo

            const Lead = await new LeadRepo().assignLeadToUser(id, assignLead);

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPDATED,
                        Lead
                    )
                );
        } catch (err) {
            // console.log('err', err)
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const createLead = req?.body;

            let getAttributes: any = '';
            const whereName = 'email'
            const whereVal = req?.body?.email;
            const existingLead = await new LeadRepo().getLeadByAttr(whereName, whereVal, getAttributes);
            if (existingLead) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.EXISTS
                        )
                    );
            }

            const user_id = get(req, 'user_id', 0);
            let payload = { ...req?.body, createdBy: user_id, assignedTo: user_id, source: LEAD_SOURCE.ADMIN };

            const Lead = await new LeadRepo().create(payload);
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.CREATED,
                        Lead
                    )
                );
        } catch (err) {
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
            sorting = sorting.split(" ");

            const Leads = await new LeadRepo().list({
                offset: parseInt(skip),
                limit: parseInt(size),
                search,
                sorting,
                trashOnly
            });

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        Leads
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
            const id = get(req?.params, "id", "");
            const payload = req?.body;
            const email = get(payload, "email", '');

            let getAttributes: any = ['*'];
            const whereName = 'id'
            const whereVal = id;
            const existingLead = await new LeadRepo().getLeadByAttr(whereName, whereVal, getAttributes);

            if (isEmpty(existingLead)) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.NOT_EXISTS
                        )
                    );
            }

            const checkPermissionExist = await new LeadRepo().checkLeadExist(email as string, id as number);
            if (checkPermissionExist) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.EXISTS
                        )
                    );
            }

            delete payload.id
            const Lead = await new LeadRepo().update(id, payload);
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPDATED,
                        Lead
                    )
                );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req?.params, "id", "");

            let getAttributes: any = '';
            const whereName = 'id'
            const whereVal = id;
            const existingLead = await new LeadRepo().getLeadByAttr(whereName, whereVal, getAttributes);

            if (isEmpty(existingLead)) {
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
                        existingLead
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

            const Lead = await new LeadRepo().delete(ids);
            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.DELETED,
                        Lead
                    )
                );
        } catch (err) {
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

}