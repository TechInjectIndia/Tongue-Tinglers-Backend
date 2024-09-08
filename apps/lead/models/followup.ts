const { Op } = require("sequelize");
import {
    TLead,
    TListFilters
} from "../../../types";
import { LeadsModel } from "../../../database/schema";

import IBaseRepo from '../controllers/controller/IFollowUpsController';

export class FollowUpsRepo implements IBaseRepo<TLead, TListFilters> {
    constructor() { }

    public async getFollowUpsToday(startDate: Date, endDate: Date, assignedTo: number, getAttributes: any = ['*']): Promise<TLead | any> {
        const data = await LeadsModel.findAll({
            raw: true,
            attributes: getAttributes,
            where: {
                follow_date: {
                    [Op.between]: [startDate, endDate]
                },
                assignedTo: assignedTo
            }
        });
        return data;
    }
}
