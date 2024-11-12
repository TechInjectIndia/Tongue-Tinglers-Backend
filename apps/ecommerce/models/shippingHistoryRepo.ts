import { ShippingHistoryModel } from "../../../database/schema";
import { IShippingHistory, IShippingActivity, IShippingHistoryPayload } from "../../../interfaces";
import { Op } from "sequelize";

export class ShippingHistoryRepo {
    constructor() { }

    // Create a new shipping history record
    public async addShippingHistory(orderId: string, shippingData: IShippingHistoryPayload): Promise<IShippingHistory> {
        try {
            const shippingHistory = await ShippingHistoryModel.create({
                orderId,
                date: shippingData.date,
                activities: shippingData.activities
            });
            return shippingHistory;
        } catch (error) {
            console.error("Error adding shipping history:", error);
            throw error;
        }
    }

    // Get shipping history for a specific order
    public async getShippingHistoryByOrderId(orderId: string): Promise<IShippingHistory[]> {
        try {
            const shippingHistory = await ShippingHistoryModel.findAll({
                where: { orderId },
                order: [['date', 'ASC']]  // Order by date ascending
            });
            return shippingHistory;
        } catch (error) {
            console.error("Error fetching shipping history:", error);
            throw error;
        }
    }

    // Get specific shipping activity by orderId and tracking number (optional)
    public async getShippingActivityByTracking(orderId: string, trackingNumber?: string): Promise<IShippingActivity[]> {
        try {
            const whereCondition = {
                orderId,
            };

            if (trackingNumber) {
                whereCondition['activities.trackingNumber'] = { [Op.like]: `%${trackingNumber}%` };
            }

            const shippingHistory = await ShippingHistoryModel.findAll({
                where: whereCondition,
                include: [{
                    model: ShippingHistoryModel,
                    attributes: ['activities']
                }],
                order: [['date', 'ASC']]
            });

            const activities = shippingHistory.flatMap(history => history.activities);
            return activities;
        } catch (error) {
            console.error("Error fetching shipping activity:", error);
            throw error;
        }
    }

    // Update shipping history for a given order
    public async updateShippingHistory(orderId: string, status: any, trackingNumber: any): Promise<[affectedCount: number]> {
        try {

            const shippingHistory = await ShippingHistoryModel.findOne({
                where: { orderId },
            });
            if (!shippingHistory) {
                throw new Error(`Shipping history not found for order ID: ${orderId}`);
            }

            // Push the new activity data into the activities array
            const newActivity: any = {
                status: status,
                time: new Date()
            };

            let statusAcivity = shippingHistory.activities.push(newActivity);
            const payload: any = {
                activities: statusAcivity,
                trackingNumber
            }

            if (status != 'shipped') {
                delete payload.trackingNumber;
            }

            const response = await ShippingHistoryModel.update(payload, {
                where: {
                    orderId,
                },
            });
            return response;
        } catch (error) {
            console.error("Error updating shipping history:", error);
            throw error;
        }
    }

    // Delete shipping history for a specific order
    public async deleteShippingHistory(id: string): Promise<number> {
        try {
            const affectedCount = await ShippingHistoryModel.destroy({
                where: {
                    id,
                },
            });
            return affectedCount;
        } catch (error) {
            console.error("Error deleting shipping history:", error);
            throw error;
        }
    }
}
