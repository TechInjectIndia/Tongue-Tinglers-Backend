import { NextFunction, Request, Response } from "express";
import { get, isEmpty } from "lodash";
import { sendResponse, createPassword, createFirebaseUser, sendEmail, getEmailTemplate, EMAIL_TEMPLATE, EMAIL_HEADING } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { LeadRepo } from '../models/lead';
import { AdminRepo } from '../../admin-user/models/user';
import { FranchiseRepo } from '../../admin-user/models/franchise';
import { ITrackable, LeadStatus, USER_TYPE, USER_STATUS } from '../../../interfaces';
import { TAssignLead } from '../../../types';
import { Sequelize } from 'sequelize';

export default class LeadController {

    static async convertLeadToFranchisee(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const id = get(req.body, "id", "");
            const existingLead = await new LeadRepo().getLeadByStatus(id);

            if (!existingLead) {
                return res.status(400).send(sendResponse(RESPONSE_TYPE.ERROR, ERROR_MESSAGE.NOT_EXISTS));
            }

            const user_id = get(req, "user_id", 0);
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
                type: USER_TYPE.FRANCHISE,
                status: USER_STATUS.ACTIVE,
                referBy: existingLead.referBy,
            };

            const existingFranchise = await new FranchiseRepo().getFranchiseByEmail(payload.email);
            if (existingFranchise) {
                return res.status(400).send(sendResponse(RESPONSE_TYPE.ERROR, ERROR_MESSAGE.FRANCHISE_EXISTS));
            }

            const firebaseUser = await createFirebaseUser({
                email: payload.email,
                emailVerified: true,
                phoneNumber: payload.phoneNumber,
                password: payload.password,
                disabled: false,
            });

            if (!firebaseUser?.success) {
                return res.status(400).send(sendResponse(RESPONSE_TYPE.ERROR, firebaseUser?.uid));
            }

            const hashedPassword = await createPassword(payload.password);
            await new FranchiseRepo().create({
                ...payload,
                password: hashedPassword,
                firebaseUid: firebaseUser.uid,
            });

            await new LeadRepo().updateStatus(id, { status: LeadStatus.CONVERTED });

            try {
                const emailContent = await getEmailTemplate(EMAIL_TEMPLATE.NEW_FRANCHISE_CREATED, {
                    leadName: `${existingLead.firstName} ${existingLead.lastName}`,
                    leadEmail: existingLead.email,
                    leadPhone: existingLead.phoneNumber,
                });

                const mailOptions = {
                    to: existingLead.email,
                    subject: EMAIL_HEADING.NEW_FRANCHISE_CREATED,
                    templateParams: {
                        heading: EMAIL_HEADING.NEW_FRANCHISE_CREATED,
                        description: emailContent,
                    },
                };

                await sendEmail(mailOptions.to, mailOptions.subject, mailOptions.templateParams);
            } catch (emailError) {
                console.error("Error sending email:", emailError);
            }

            return res.status(200).send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.FRANCHISE_CREATED));
        } catch (err) {
            console.error(err);
            return res.status(500).send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
        }
    }

    static async getLeadStatus(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const id = get(req.params, "id", "");
            const getAttributes = ['status'];
            const existingLead = await new LeadRepo().getLeadStatus('id', id, getAttributes);

            if (isEmpty(existingLead)) {
                return res.status(400).send(sendResponse(RESPONSE_TYPE.ERROR, ERROR_MESSAGE.NOT_EXISTS));
            }

            return res.status(200).send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.FETCHED, existingLead));
        } catch (err) {
            console.error(err);
            return res.status(500).send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
        }
    }

    static async assignLeadToAdminUser(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const id = get(req.body, "id", "");
            const assignee = get(req.body, "assignee", {}); // Changed from assigneeArray to assignee
            const existingLead = await new LeadRepo().getLeadByAttr('id', id);

            if (isEmpty(existingLead)) {
                return res.status(400).send(sendResponse(RESPONSE_TYPE.ERROR, ERROR_MESSAGE.NOT_EXISTS));
            }

            const payload: TAssignLead = {
                assign: assignee, // Directly assign the single assignee object
            };

            const updatedLead = await new LeadRepo().assignLeadToUser(id, payload);

            return res.status(200).send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.UPDATED, updatedLead));
        } catch (err) {
            console.error(err);
            return res.status(500).send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
        }
    }

    static async create(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const user_id = get(req, 'user_id', '');
            const user_name = get(req, 'user_name', '');
            const whereVal = get(req.body, "email", "");
            const existingLead = await new LeadRepo().getLeadByAttr('email', whereVal);

            if (existingLead) {
                return res.status(400).send(sendResponse(RESPONSE_TYPE.ERROR, ERROR_MESSAGE.EXISTS));
            }

            const payload = {
                ...req.body,
                createdBy: user_id,
                // logs: [{
                //     userDetails: {
                //         userName: user_name,
                //         id: user_id
                //     },
                //     events: 'Lead created',
                //     timeline: new Date(),
                // }],
            };

            if (payload.referby) {
                const existingReferral = await new AdminRepo().getByReferralCode(payload.referby);
                if (!existingReferral) {
                    return res.status(404).send(sendResponse(RESPONSE_TYPE.ERROR, `Referral code ${ERROR_MESSAGE.NOT_EXISTS}`));
                }
            }

            const newLead = await new LeadRepo().create(payload);
            return res.status(200).send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.CREATED, newLead));
        } catch (err) {
            console.error(err);
            return res.status(500).send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
        }
    }

    static async list(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const size = get(req.query, "size", 10);
            const skip = get(req.query, "skip", 1);
            const search = get(req.query, "search", "");
            const sorting = get(req.query, "sorting", "id DESC").toString().split(" ");

            const leadsList = await new LeadRepo().list({
                offset: skip as number,
                limit: size as number,
                search: search as string,
                sorting: sorting,
            });

            return res.status(200).send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.FETCHED, leadsList));
        } catch (err) {
            console.error(err);
            return res.status(500).send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
        }
    }

    static async update(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const user_id = get(req, 'user_id', '');
            // const user_name = get(req, 'user_name', '');
            const id = get(req.params, "id", "");
            const payload = req.body;

            let getAttributes: any = ['*'];
            const whereName = 'id'
            const whereVal = id;

            const existingLead = await new LeadRepo().getLeadByAttr(whereName, whereVal, getAttributes);
            if (isEmpty(existingLead)) {
                return res.status(400).send(sendResponse(RESPONSE_TYPE.ERROR, ERROR_MESSAGE.NOT_EXISTS));
            }

            // const updateLog: ITrackable = {
            //     userDetails: {
            //         userName: user_name || 'unknown',
            //         id: user_id || 'unknown'
            //     },
            //     events: `Lead updated`,
            //     timeline: new Date(),
            // };
            // const existingLogs = Array.isArray(existingLead.logs) ? existingLead.logs : [];
            // const updatedLogs = [...existingLogs, updateLog];

            const updatedLead = await new LeadRepo().update(id, {
                ...payload,
                updatedBy: user_id,
                // logs: updatedLogs
            });

            return res.status(200).send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.UPDATED, updatedLead));
        } catch (err) {
            console.error(err);
            return res.status(500).send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
        }
    }

    static async get(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const id = get(req.params, "id", "");
            const existingLead = await new LeadRepo().getLeadByAttr('id', id);

            if (isEmpty(existingLead)) {
                return res.status(400).send(sendResponse(RESPONSE_TYPE.ERROR, ERROR_MESSAGE.NOT_EXISTS));
            }

            return res.status(200).send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.FETCHED, existingLead));
        } catch (err) {
            console.error(err);
            return res.status(500).send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const ids = get(req.body, "ids", []);
            if (!Array.isArray(ids) || ids.length === 0) {
                return res.status(400).send(sendResponse(RESPONSE_TYPE.ERROR, "No IDs provided for deletion."));
            }

            // Check if leads exist
            const existingLeads = await Promise.all(ids.map(id => new LeadRepo().getLeadByAttr('id', id, ['*'])));
            const nonExistentIds = ids.filter((id, index) => !existingLeads[index]);

            if (nonExistentIds.length > 0) {
                return res.status(400).send(sendResponse(RESPONSE_TYPE.ERROR, `Leads not found: ${nonExistentIds.join(", ")}`));
            }

            // Proceed with deletion
            const deletedCount = await new LeadRepo().delete(ids);

            return res.status(200).send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.DELETED, { deletedCount }));
        } catch (err) {
            console.error(err);
            return res.status(500).send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
        }
    }
}
