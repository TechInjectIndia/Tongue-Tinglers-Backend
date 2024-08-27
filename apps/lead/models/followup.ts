const { Op } = require("sequelize");
import {
    TLead,
} from "../../../types/lead/lead";
import { Lead } from "../../../database/schema";

export class FollowUpsModel {
    constructor() { }

    public async getFollowUpsToday(startDate: any, endDate: any, getAttributes: any = '*'): Promise<TLead | any> {
        const data = await Lead.findOne({
            raw: true,
            attributes: getAttributes,
            where: {
                follow_date: {
                    [Op.between]: [startDate, endDate]
                }
            }
        });
        return data;
    }
}
