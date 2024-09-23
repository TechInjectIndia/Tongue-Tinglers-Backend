import { NextFunction, Request, Response } from "express";
import { FollowUpsRepo } from '../models/followup';

export default class FollowUpsController {

    // Method to get today's follow-ups for a specific assigned user
    static async getTodayFollowUps(req: Request, res: Response): Promise<Response> {
        try {
            const assignedToId = req.params.assignedTo;

            if (!assignedToId) {
                return res.status(400).json({ message: 'Assigned user ID is required.' });
            }

            const attributes = ['id', 'firstName', 'lastName', 'email', 'followDetails'];

            const followUps = await new FollowUpsRepo().getTodayFollowUps(String(assignedToId), attributes);

            return res.status(200).json(followUps);
        } catch (error) {
            console.error('Error retrieving follow-ups:', error);
            return res.status(500).json({ message: 'An error occurred while fetching follow-ups.' });
        }
    }

    // Method to get all leads with follow-ups scheduled for today
    static async getLeadsByTodayFollowUps(req: Request, res: Response): Promise<Response> {
        try {
            const attributes = ['id', 'firstName', 'lastName', 'email', 'followDetails'];

            const leads = await new FollowUpsRepo().getLeadsByTodayFollowUps(attributes);

            return res.status(200).json(leads);
        } catch (error) {
            console.error('Error retrieving leads:', error);
            return res.status(500).json({ message: 'An error occurred while fetching leads.' });
        }
    }
}
