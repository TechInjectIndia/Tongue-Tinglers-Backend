import { Op } from "sequelize"; // Corrected import statement for Op
import {
    TAnalyticsFilters,
    TAnalyticssList,
} from "../../../types/analytics";
import { RetortProductsModel } from "../../../database/schema"; // Import your model here
import { LeadsModel } from "../../../database/schema"; // Ensure this is relevant to your analytics

export class AnalyticsModel {
    constructor() { }

    public async retortAnalytics(range: any): Promise<TAnalyticssList | any> {
        try {
            // Define the date range for filtering based on the 'range' parameter
            let startDate: Date;
            let endDate: Date = new Date();

            switch (range) {
                case "Week":
                    startDate = new Date();
                    startDate.setDate(endDate.getDate() - 7);
                    break;
                case "Month":
                    startDate = new Date();
                    startDate.setMonth(endDate.getMonth() - 1);
                    break;
                case "Year":
                    startDate = new Date();
                    startDate.setFullYear(endDate.getFullYear() - 1);
                    break;
                default:
                    throw new Error("Invalid range specified");
            }

            // Query to fetch analytics data from RetortProductsModel based on the specified date range
            const analyticsData = await RetortProductsModel.findAll({
                where: {
                    createdAt: {
                        [Op.between]: [startDate, endDate], // Filter by createdAt date
                    },
                },
            });

            return analyticsData; // Return the fetched analytics data
        } catch (error) {
            console.error("Error fetching retort analytics:", error);
            throw new Error("Failed to fetch retort analytics");
        }
    }
}
