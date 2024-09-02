const { Op } = require("sequelize");
import {
    TLead,
} from "../../../types/lead/lead";
import { LeadsModel } from "../../../database/schema";

export class FollowUpsModel {
    constructor() { }

    public async getFollowUpsToday(startDate: Date, endDate: Date, assignedTo: number, getAttributes: any = '*'): Promise<TLead | any> {
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
