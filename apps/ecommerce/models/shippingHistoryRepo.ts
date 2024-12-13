import { ShippingHistoryModel, OrdersModel } from "../../../database/schema";
import { IShippingHistory, IShippingActivity, IShippingHistoryPayload } from "../../../interfaces";
import { Op } from "sequelize";

export class ShippingHistoryRepo {
    constructor() { }

    // Create a new shipping history record
    public async addShippingHistory(orderId: number, shippingData: IShippingHistoryPayload): Promise<IShippingHistory> {
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
    public async getShippingHistoryByOrderId(orderId: number): Promise<IShippingHistory[]> {
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
    public async getShippingActivityByTracking(orderId: number, trackingNumber?: string): Promise<IShippingActivity[]> {
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

    public async updateShippingHistory(orderId: number, status: any, trackingNumber: any): Promise<[affectedCount: number]> {
        try {
            const shippingHistory = await ShippingHistoryModel.findOne({
                where: { orderId },
            });

            if (!shippingHistory) {
                throw new Error(`Shipping history not found for order ID: ${orderId}`);
            }

            // Define the new activity to be added
            const newActivity: any = {
                status: status,
                time: new Date()
            };

            // Check if 'activities' is an array, if not, initialize it
            let array = shippingHistory.activities;

            if (Array.isArray(array)) {
                // If it's an array, push the new activity
                array.push(newActivity);
            } else {
                // If it's not an array, initialize it and add the new activity
                array = [newActivity];
            }

            // Create the payload for updating the shipping history
            const payload: any = {
                activities: array,
            };

            // Remove tracking number if the status is not 'shipped'
            if (status === 'Shipped') {
                // Update the Order with the new data
                const response = await OrdersModel.update({ trackingNumber }, {
                    where: {
                        id: orderId,
                    },
                });
            }

            // Update the shipping history with the new data
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
    public async deleteShippingHistory(id: number): Promise<number> {
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
