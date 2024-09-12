import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse, createPassword, createFirebaseUser } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { LeadRepo } from '../models/lead';
import { FranchiseRepo } from '../../admin-user/models/franchise';
import { LEAD_SOURCE, LEAD_STATUS } from '../../../interfaces';
import { TAssignLead } from "../../../types";

export default class LeadController {
    static async convertLeadToFranchisee(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req?.body, "id", 0);
            const existingLead = await new LeadRepo().getLeadByStatus(id as number);
            if (isEmpty(existingLead)) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.NOT_EXISTS
                        )
                    );
            } else {
                const user_id = get(req, 'user_id', 0);

                const payload = {
                    firstName: existingLead.firstName,
                    lastName: existingLead.lastName,
                    nameForSearch: existingLead.firstName,
                    email: existingLead.email,
                    userName: existingLead.email,
                    phoneNumber: existingLead.phoneNumber,
                    password: 'Test@123#',
                    createdBy: `${user_id}`,
                    role: 1,
                }

                const existingFranchise = await new FranchiseRepo().getFranchiseByEmail(payload.email);
                if (existingFranchise) {
                    return res
                        .status(400)
                        .send(
                            sendResponse(
                                RESPONSE_TYPE.ERROR,
                                ERROR_MESSAGE.FRANCHISE_EXISTS
                            )
                        );
                }

                const firebaseUser = await createFirebaseUser({
                    email: payload.email,
                    emailVerified: true,
                    phoneNumber: payload.phoneNumber,
                    password: payload.password,
                    disabled: false
                });

                if (!firebaseUser?.success) {
                    return res
                        .status(400)
                        .send(
                            sendResponse(
                                RESPONSE_TYPE.ERROR,
                                firebaseUser?.uid
                            )
                        );
                }

                const hashedPassword = await createPassword(payload.password);
                await new FranchiseRepo().create({
                    ...payload,
                    password: hashedPassword,
                    firebaseUid: firebaseUser.uid
                });

                let payloadLead = { status: LEAD_STATUS.CONVERTED };
                const covertedLead = await new LeadRepo().updateStatus(id as number, payloadLead);

                return res
                    .status(200)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.SUCCESS,
                            SUCCESS_MESSAGE.FRANCHISE_CREATED
                        )
                    );
            }
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async getLeadStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const id = get(req?.params, "id", 0);
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
            const id = get(req?.body, "id", "");
            const assignedBy = get(req, "user_id", "0");
            const assignedTo = get(req?.body, "assignedTo", "");
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Start of the day

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

            let assignLead: any = [];
            let tmp: any = {};
            tmp.assignedBy = assignedBy
            tmp.assignedTo = assignedTo
            tmp.assignedDate = today
            assignLead.push(tmp);

            if (!existingLead.assign || !Array.isArray(existingLead.assign)) {
                existingLead.assign = [];
            }
            const assignArray = [...existingLead.assign, ...assignLead]

            const Lead = await new LeadRepo().assignLeadToUser(id, { assign: assignArray });
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
            console.log('err', err)
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
            let payload = { ...req?.body, createdBy: user_id, assignedTo: user_id, source: LEAD_SOURCE.ADMIN, };
            // let followDateNew = payload.followedDate;
            // payload.followedDate = [];
            // payload.followedDate.push(followDateNew)

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

            const Leads = await new LeadRepo().list({
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
            const id = get(req?.params, "id", 0);
            const payload = req?.body;

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

            delete payload.id

            let followDateNew = payload.followedDate;
            payload.followedDate = [];
            if (!existingLead.followedDate || !Array.isArray(existingLead.followedDate)) {
                existingLead.followedDate = [];
            }
            existingLead.followedDate.push(followDateNew)
            payload.followedDate = existingLead.followedDate;

            const Lead = await new LeadRepo().update(id as number, payload);
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
            const id = get(req?.params, "id", 0);

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