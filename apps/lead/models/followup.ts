const { Op } = require("sequelize");
import {
    TLead,
} from "../../../types/lead/lead";
import { Lead } from "../../../database/schema";

export class FollowUpsModel {
    constructor() { }

    public async getFollowUpsToday(startDate: Date, endDate: Date, assigned_to: number, getAttributes: any = '*'): Promise<TLead | any> {
        const data = await Lead.findAll({
            raw: true,
            attributes: getAttributes,
            where: {
                follow_date: {
                    [Op.between]: [startDate, endDate]
                },
                assigned_to: assigned_to
            }
        });
        return data;
    }
}
