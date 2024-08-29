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

    public async leadSources(filters: TAnalyticsFilters): Promise<TAnalyticssList | any> {
        // Get leads get by website, facebook source

        Lead.findAll({
            where: {
                column: {
                    [Op.contains]: [{ id: '1' }]
                }
            }
        });
    }

    public async conversionRate(filters: TAnalyticsFilters): Promise<TAnalyticssList | any> {
        // Get leads which are converted
    }

    public async salesPipeline(filters: TAnalyticsFilters): Promise<TAnalyticssList | any> {

    }
}
