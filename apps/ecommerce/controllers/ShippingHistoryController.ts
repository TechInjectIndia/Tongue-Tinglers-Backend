import { Request, Response } from 'express';
import { ShippingHistoryRepo } from '../models/shippingHistoryRepo';
import { IShippingHistory } from '../../../interfaces';
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
import { sendResponse } from "../../../libraries";

const shippingHistoryRepo = new ShippingHistoryRepo();

export default class ShippingHistoryController {

    // Create a new shipping history record
    public async addShippingHistory(req: Request, res: Response): Promise<Response> {
        const { orderId, shippingData }: { orderId: number, shippingData: IShippingHistory } = req.body;

        try {
            const createdShippingHistory = await shippingHistoryRepo.addShippingHistory(orderId, shippingData);
            return res.status(201).json(createdShippingHistory);
        } catch (error) {
            return res.status(500).json({ message: "Failed to create shipping history", error: error.message });
        }
    }

    // Get shipping history by orderId
    public async getShippingHistory(req: Request, res: Response): Promise<Response> {
        const { orderId } = req.params;

        try {
            const shippingHistory = await shippingHistoryRepo.getShippingHistoryByOrderId(orderId);
            if (!shippingHistory) {
                return res.status(404).json({ message: "Shipping history not found" });
            }
            return res.status(200).json(shippingHistory);
        } catch (error) {
            return res.status(500).json({ message: "Failed to fetch shipping history", error: error.message });
        }
    }

    // Get specific shipping activity by orderId and optional tracking number
    public async getShippingActivity(req: Request, res: Response): Promise<Response> {
        const { orderId } = req.params;
        const { trackingNumber } = req.query;

        try {
            const shippingActivity = await shippingHistoryRepo.getShippingActivityByTracking(orderId, trackingNumber as string);
            return res.status(200).json(shippingActivity);
        } catch (error) {
            return res.status(500).json({ message: "Failed to fetch shipping activity", error: error.message });
        }
    }

    // Update shipping history for a given order
    public async updateShippingHistory(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { status } = req.body;
        const { trackingNumber } = req.body;
        if (status == '') {
            return res.status(404).json(sendResponse(
                RESPONSE_TYPE.ERROR,
                'Status should not be empty'
            ));
        }
        if (status === 'Shipped' && trackingNumber == '') {
            return res.status(404).json(sendResponse(
                RESPONSE_TYPE.ERROR,
                'Tracking Number should not be empty'
            ));
        }

        try {
            const updatedShippingHistory = await shippingHistoryRepo.updateShippingHistory(id, status, trackingNumber);
            if (!updatedShippingHistory) {
                return res.status(404).json(sendResponse(
                    RESPONSE_TYPE.ERROR,
                    'Shipping history not found for update'
                ));
            }
            return res.status(200).json(
                sendResponse(
                    RESPONSE_TYPE.SUCCESS,
                    SUCCESS_MESSAGE.UPDATED,
                    updatedShippingHistory
                ));
        } catch (error) {
            return res.status(500).json({ message: "Failed to update shipping history", error: error.message });
        }
    }

    // Delete shipping history for a specific order
    public async deleteShippingHistory(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            const affectedCount = await shippingHistoryRepo.deleteShippingHistory(id);
            if (affectedCount > 0) {
                return res.status(200).json({ message: "Shipping history deleted successfully" });
            }
            return res.status(404).json({ message: "Shipping history not found" });
        } catch (error) {
            return res.status(500).json({ message: "Failed to delete shipping history", error: error.message });
        }
    }
}
