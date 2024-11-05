import { Op } from "sequelize";
import {
    TLeadStatus,
    TAssignLead,
    TLeadPayload,
    TListFilters,
    TLeadsList,
} from "../../../types";
import { ITrackable } from "../../../interfaces";
import { LeadsModel } from "../../../database/schema";
import { AssignModel } from "../../../database/schema";
import { UserModel } from "../../../database/schema";
import { LeadStatus, ILead } from '../../../interfaces'; // Use the LeadStatus enum from interfaces
import IBaseRepo from '../controllers/controller/ILeadController';

export class LeadRepo implements IBaseRepo<ILead, TListFilters> {
    constructor() { }

    // Update the status of a lead
    public async updateStatus(id: string, data: TLeadStatus): Promise<[affectedCount: number]> {
        const response = await LeadsModel.update(data, {
            where: { id },
        });
        return response;
    }

    // Get lead status by any attribute
    public async getLeadStatus(whereName: keyof ILead, whereVal: any, getAttributes: any = ['*']): Promise<TLeadStatus | null> {
        const whereAttributes = { [whereName]: whereVal };
        const data = await LeadsModel.findOne({
            raw: true,
            attributes: getAttributes,
            where: whereAttributes
        });
        return data as TLeadStatus | null;
    }

    // Get lead by attribute
    public async getLeadByAttr(whereName: keyof ILead, whereVal: any, getAttributes: any = ['*']): Promise<ILead | null> {
        const whereAttributes = { [whereName]: whereVal };
        const data = await LeadsModel.findOne({
            where: whereAttributes,
            include: [
                {
                    model: AssignModel,
                    as: 'assign',
                    attributes: ['assignedTo', 'assignedBy', 'assignedDate'],
                    include: [
                        {
                            model: UserModel, // Assuming UserModel is the model for user details
                            as: 'userDetails', // Use the alias defined in the relationship
                            attributes: ['id', 'userName'], // Specify the user details attributes you need
                        }
                    ],
                }
            ]
        });
        return data as ILead | null;
    }

    // Get lead by ID
    public async get(id: string): Promise<ILead | null> {
        const data = await LeadsModel.findOne({
            raw: true,
            where: { id }
        });
        return data as ILead | null;
    }

    // Get lead by ID and status
    public async getLeadByStatus(id: string): Promise<ILead | null> {
        const data = await LeadsModel.findOne({
            raw: true,
            where: {
                id: id,
            },
        });
        return data as ILead | null;
    }

    // Check if lead exists with a specific email and exclude a specific ID
    public async checkLeadExist(email: string, excludeId: string): Promise<ILead | null> {
        const data = await LeadsModel.findOne({
            where: {
                email: email,
                id: { [Op.ne]: excludeId },
            },
        });
        return data as ILead | null;
    }

    // List leads with filters
    public async list(filters: TListFilters): Promise<TLeadsList> {
        const total = await LeadsModel.count({
            where: {
                firstName: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });

        const data = await LeadsModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                firstName: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });

        return { total, data } as TLeadsList;
    }

    // Create a new lead
    public async create(data: TLeadPayload): Promise<ILead> {
        const leadData: TLeadPayload = {
            ...data,
            // Ensure logs is kept as an array
            logs: data.logs, // Assuming logs is already of type ITrackable[]
        };

        const response = await LeadsModel.create(leadData);
        return response as ILead; // Explicitly cast the response to ILead
    }

    // Update lead information
    public async update(id: string, data: TLeadPayload): Promise<[affectedCount: number]> {
        const response = await LeadsModel.update(data, {
            where: { id },
        });
        return response;
    }

    // Assign a lead to a user
    public async assignLeadToUser(id: string, data: any): Promise<[affectedCount: number]> {
        try {
            const response = await LeadsModel.update(data, {
                where: { id },
            });

            return response;
        } catch (error) {
            console.error("Error updating lead:", error);
            throw new Error("Failed to assign lead to user"); // Rethrow or handle as needed
        }
    }

    // Delete leads by an array of IDs
    public async delete(ids: string[]): Promise<number> {
        try {
            const deletedCount = await LeadsModel.destroy({
                where: {
                    id: ids,
                },
            });
            return deletedCount;
        } catch (error) {
            console.error("Error deleting leads:", error);
            throw new Error("Failed to delete leads"); // Rethrow or handle as needed
        }
    }

}
