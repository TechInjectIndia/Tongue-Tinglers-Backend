import { Op } from "sequelize";

import IBaseRepo from '../controllers/controller/IAssignController';
import { AssignAttributes } from "interfaces/leads";
import { AssignModel } from "./AssignTable";

export class AssignRepo implements IBaseRepo<AssignAttributes, any> {
    constructor() { }

    // Create a new assignment
    public async create(data: AssignAttributes): Promise<AssignAttributes> {
        const response = await AssignModel.create(data);
        return response as AssignAttributes; // Explicitly cast the response to AssignAttributes
    }

    // Get assignment by ID
    public async get(id: number): Promise<AssignAttributes | null> {
        const data = await AssignModel.findOne({
            raw: true,
            where: { id },
        });
        return data as AssignAttributes | null;
    }

    // Get assignments by lead ID
    public async getByLeadId(leadId: number): Promise<AssignAttributes[]> {
        const data = await AssignModel.findAll({
            raw: true,
            where: { leadId },
        });
        return data as AssignAttributes[]; // Return an array of assignments
    }

    // Update an assignment
    public async createOrUpdate(leadId, data: Partial<AssignAttributes>): Promise<[instance: AssignModel, created: boolean]> {
        // Add leadId to data to ensure it's included in the upsert check
        const response = await AssignModel.upsert({ leadId, ...data });

        return response;
    }

    // Delete assignments by an array of IDs
    public async delete(id: number): Promise<number> {
        try {
            const deletedCount = await AssignModel.destroy({
                where: {
                    leadId: id,
                },
            });
            return deletedCount;
        } catch (error) {
            console.error("Error deleting assignments:", error);
            throw new Error("Failed to delete assignments"); // Rethrow or handle as needed
        }
    }

    // Check if an assignment exists for a specific lead
    public async checkAssignmentExist(leadId: number, userId: number): Promise<AssignAttributes | null> {
        const data = await AssignModel.findOne({
            where: {
                leadId,
                assignedTo: userId,
            },
        });
        return data as AssignAttributes | null;
    }
}
