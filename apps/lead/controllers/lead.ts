import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { LeadModel } from '../models/lead';

export default class LeadController {

    static async getLeadStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req?.params, "id", "");
            let getAttributes: any = ['status'];
            const whereName = 'id'
            const whereVal = id;
            const existingLead = await new LeadModel().getLeadStatus(whereName, whereVal, getAttributes);
            
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
            const id = get(req?.body, "lead_id", "");
            const assigned_by = get(req, "user_id", "");
            const assigned_to = get(req?.body, "assigned_to", "");
            
            let getAttributes: any = '';
            const whereName = 'id'
            const whereVal = id;
            const existingLead = await new LeadModel().getLeadByAttr(whereName, whereVal, getAttributes);

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
            assignLead.assigned_to = assigned_to
            
            const Lead = await new LeadModel().assignLeadToUser(id, assignLead);

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

    static async add(req: Request, res: Response, next: NextFunction) {
        try {
            const createLead = req?.body;

            let getAttributes: any = '';
            const whereName = 'email'
            const whereVal = req?.body?.email;
            const existingLead = await new LeadModel().getLeadByAttr(whereName, whereVal, getAttributes);
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

            const id = get(req, "user_id", "");
            createLead.created_by = id
            createLead.assigned_to = id
            createLead.source = "Admin"

            const Lead = await new LeadModel().add(createLead);
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

            const Leads = await new LeadModel().list({
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

            let getAttributes: any = '';
            const whereName = 'id'
            const whereVal = id;
            const existingLead = await new LeadModel().getLeadByAttr(whereName, whereVal, getAttributes);

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

            const updateLead = req?.body;
            delete updateLead.id
            const Lead = await new LeadModel().update(id, updateLead);

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
            const existingLead = await new LeadModel().getLeadByAttr(whereName, whereVal, getAttributes);

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

            const Lead = await new LeadModel().delete(ids);
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