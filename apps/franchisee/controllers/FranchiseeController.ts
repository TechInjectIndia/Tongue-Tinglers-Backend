import { Request, Response } from 'express';
import { FranchiseeRepo } from '../models/FranchiseeRepo'; // Adjust the import path as necessary
import { sendResponse } from '../../../libraries';
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from '../../../constants';

export default class FranchiseeController {
    // Create a new franchisee
    static async createFranchisee(req: Request, res: Response) {
        try {
            const franchiseeData = req.body;

            // Call the repository method to create a franchisee
            const newFranchisee = await new FranchiseeRepo().createFranchisee(franchiseeData);

            return res.status(201).send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.CREATED, newFranchisee));
        } catch (error) {
            console.error('Error creating franchisee:', error);
            return res.status(500).send({
                message: error.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    // Retrieve all franchisees
    static async getAllFranchisees(req: Request, res: Response) {
        try {
            const franchisees = await new FranchiseeRepo().getAllFranchisees();

            return res.status(200).send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.FETCHED, franchisees));
        } catch (error) {
            console.error('Error fetching franchisees:', error);
            return res.status(500).send({
                message: error.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    // Retrieve a franchisee by ID
    static async getFranchiseeById(req: Request, res: Response) {
        try {
            const franchiseeId = req.params.id;
            const franchisee = await new FranchiseeRepo().getFranchiseeById(franchiseeId);

            if (!franchisee) {
                return res.status(404).send({
                    message: 'Franchisee not found.',
                });
            }

            return res.status(200).send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.FETCHED, franchisee));
        } catch (error) {
            console.error('Error fetching franchisee:', error);
            return res.status(500).send({
                message: error.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    // Update a franchisee by ID
    static async updateFranchisee(req: Request, res: Response) {
        try {
            const franchiseeId = req.params.id;
            let franchiseeData = req.body;
            console.log(franchiseeId);

            if (typeof franchiseeData === 'string') {
                franchiseeData = JSON.parse(franchiseeData);
            }
            const updatedFranchisee = await new FranchiseeRepo().updateFranchisee(franchiseeId, franchiseeData);

            if (!updatedFranchisee) {
                return res.status(404).send({
                    message: 'Franchisee not found.',
                });
            }

            return res.status(200).send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.UPDATED, updatedFranchisee));
        } catch (error) {
            console.error('Error updating franchisee:', error);
            return res.status(500).send({
                message: error.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    // Delete a franchisee by ID
    static async deleteFranchisee(req: Request, res: Response) {
        try {
            const franchiseeId = req.params.id;

            const deleted = await new FranchiseeRepo().deleteFranchisee(franchiseeId);

            if (!deleted) {
                return res.status(404).send({
                    message: 'Franchisee not found.',
                });
            }

            return res.status(200).send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.DELETED));
        } catch (error) {
            console.error('Error deleting franchisee:', error);
            return res.status(500).send({
                message: error.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}
