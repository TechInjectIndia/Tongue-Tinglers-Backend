import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { sendResponse, sendEmail, getEmailTemplate, EMAIL_TEMPLATE, EMAIL_HEADING, getDateRange } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { LeadRepo } from '../models/web-lead';
import { RolesRepo } from '../../admin-user/models/roles';
import { FranchiseeRepo } from '../../franchisee/models/FranchiseeRepo';
import { LeadSource, LeadStatus } from '../../../interfaces';
import { TLeadFilters, } from "../../../types";
import { CONFIG } from '../../../config';

export default class WebLeadController {
    static async list(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const user_id = get(req, 'user_id', '');
            const size = get(req.query, "size", 100);
            const skip = get(req.query, "skip", 0);
            const search = get(req.query, "search", "") as string;
            const sorting = get(req.query, "sorting", "id DESC").toString().split(" ");
            const filter = get(req.query, "filter", "this_year") as string;
            const startDate = get(req.query, "startDate", "") as string;
            const endDate = get(req.query, "endDate", "") as string;

            // Calculate date range based on the filter type using the library function
            const dateRange = getDateRange(filter, startDate, endDate);

            // Assuming you have a method to check the user role and associated franchisee ID
            const roleId = get(req, 'role_id');
            const roleRepo = new RolesRepo();
            const roleData = await roleRepo.get(roleId as number);
            let userRole: any = '';
            if (roleData) {
                userRole = roleData.name;

                let franchiseeId: any = '';
                const franchiseRepo = new FranchiseeRepo();
                const franchiseData = await franchiseRepo.getFranchiseeByUserId(user_id as string);
                if(franchiseData){
                    franchiseeId = franchiseData.id;
                }
                const leadsList = await new LeadRepo().list({
                    offset: skip,
                    limit: size,
                    search,
                    sorting,
                    dateRange,
                    userRole,
                    franchiseeId
                } as TLeadFilters);

                return res.status(200).send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.FETCHED, leadsList));
            } else {
                return res.status(500).send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR, error: 'Franchisee Role Not exist.' });
            }

        } catch (err) {
            console.error(err);
            return res.status(500).send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR, error: err.message });
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const whereName = "email";
            const whereVal = get(req.body, "email", "");

            // Check if lead with the provided email already exists
            const existingLead = await new LeadRepo().getLeadByAttr(whereName, whereVal, "[*]");
            if (existingLead) {
                return res
                    .status(400)
                    .send(sendResponse(RESPONSE_TYPE.ERROR, ERROR_MESSAGE.EXISTS));
            }

            // Create new lead with default source and status
            const createLead = { ...req.body, source: LeadSource.SEARCH, status: LeadStatus.NEW };
            const lead = await new LeadRepo().create(createLead);

            // Send notification email to the lead
            const emailContent = await getEmailTemplate(EMAIL_TEMPLATE.LEAD_GENERATION, {
                leadName: createLead.name,
                leadEmail: createLead.email,
                leadPhone: createLead.phoneNumber,
            });

            const mailOptions = {
                to: createLead.email,
                subject: EMAIL_HEADING.LEAD_GENERATION,
                templateParams: {
                    heading: EMAIL_HEADING.LEAD_GENERATION,
                    description: emailContent,
                },
            };

            await sendEmail(mailOptions.to, mailOptions.subject, mailOptions.templateParams);

            return res
                .status(200)
                .send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.CREATED, lead));
        } catch (err) {
            console.error(err);
            return res.status(500).send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
        }
    }
}
