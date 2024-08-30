const { Op } = require("sequelize");
import {
    TAnalytics,
    TAnalyticsFilters,
    TAnalyticssList,
    TAddAnalytics,
} from "../../../types/analytics";
import { Lead } from "../../../database/schema";

export class AnalyticsModel {
    constructor() { }

    public async leadSources(startDate: Date, endDate: Date): Promise<TAnalyticssList | any> {
        // Get leads get by website, facebook source
        Lead.findAll({
            where: {
                createdAt: {
                    [Op.between]: [startDate, endDate]
                },
            }
        });
    }

    public async conversionRate(filters: TAnalyticsFilters): Promise<TAnalyticssList | any> {
        // Get leads which are converted
    }

    public async salesPipeline(filters: TAnalyticsFilters): Promise<TAnalyticssList | any> {

    }
}
