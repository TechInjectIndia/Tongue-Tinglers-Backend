const { Op } = require("sequelize");
import {
    TAnalyticsFilters,
    TAnalyticssList,
} from "../../../types/analytics";
import { Order } from "../../../database/schema";

export class AnalyticsModel {
    constructor() { }

    public async orderCountByDateWise(startDate: Date, endDate: Date): Promise<TAnalyticssList | any> {
        // Get orders Count in a period
        Order.findAll({
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate]
                },
            }
        });
    }
}
