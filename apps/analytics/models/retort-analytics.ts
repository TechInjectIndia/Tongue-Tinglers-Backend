const { Op } = require("sequelize");
import {
    TAnalyticsFilters,
    TAnalyticssList,
} from "../../../types/analytics";
import { LeadsModel } from "../../../database/schema";

export class AnalyticsModel {
    constructor() { }

    public async leadSources(filters: TAnalyticsFilters): Promise<TAnalyticssList | any> {
        // Get leads get by website, facebook source

        // LeadsModel.findAll({
        //     where: {
        //         column: {
        //             [Op.contains]: [{ id: '1' }]
        //         }
        //     }
        // });
    }

    public async conversionRate(filters: TAnalyticsFilters): Promise<TAnalyticssList | any> {
        // Get leads which are converted
    }

    public async salesPipeline(filters: TAnalyticsFilters): Promise<TAnalyticssList | any> {

    }
}
