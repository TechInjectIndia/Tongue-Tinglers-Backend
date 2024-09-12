const { Op } = require("sequelize");
import {
    TLead,
    TListFilters
} from "../../../types";
import { LeadsModel } from "../../../database/schema";

import IBaseRepo from '../controllers/controller/IFollowUpsController';

export class FollowUpsRepo implements IBaseRepo<TLead, TListFilters> {
    constructor() { }

    public async getFollowUpsToday(assignedTo: number, getAttributes: any = ['*']): Promise<TLead | any> {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Start of the day

        const data = await LeadsModel.findAll({
            raw: true,
            attributes: getAttributes,
            where: {
                followedDate: {
                    [Op.contains]: [today.toISOString()] // Use Op.contains to check for the presence of today's date
                },
                assign: {
                    [Op.contains]: [{ assignedDate: today.toISOString(), assignedTo: assignedTo }]
                }
            }
        });
        return data;
    }
}
