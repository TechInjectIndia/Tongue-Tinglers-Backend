import { Op } from "sequelize";
import {
    TLeadStatus,
    TAssignLead,
    TLeadPayload,
    TLeadFilters,
    TLeadsList,
} from "../../../types";
import { ILead } from "../../../interfaces";
import { LeadsModel } from "../../../database/schema";
import IBaseRepo from '../controllers/controller/IWebLeadController';

export class LeadRepo implements IBaseRepo<ILead> {
    constructor() { }

    public async list(filters: TLeadFilters): Promise<TLeadsList> {
        const whereConditions: any = {};

        // Search filter
        if (filters.search) {
            whereConditions.firstName = {
                [Op.like]: `%${filters.search}%`,
            };
        }

        // Date range filter
        if (filters.dateRange && filters.dateRange.start && filters.dateRange.end) {
            whereConditions.createdAt = {
                [Op.between]: [new Date(filters.dateRange.start), new Date(filters.dateRange.end)],
            };
        }

        // Count total leads with filters
        const total = await LeadsModel.count({
            where: whereConditions,
        });

        // Determine the leads list based on the user role
        // if (filters.userRole === 'super_franchise') {
        //     if (filters.franchiseeId) {
        //         whereConditions.referBy = filters.franchiseeId;
        //     }
        // } else if (filters.userRole === 'franchise') {
        //     if (filters.franchiseeId) {
        //         whereConditions.franchiseeId = filters.franchiseeId;
        //     }
        // }

        // Fetch leads with filters
        const data = await LeadsModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: whereConditions,
        });

        return { total, data } as TLeadsList;
    }

    public async getLeadByAttr(whereName: any, whereVal: any, getAttributes: any = '[*]'): Promise<ILead> {
        const whereAttributes = { [whereName]: whereVal }
        const data = await LeadsModel.findOne({
            raw: true,
            attributes: getAttributes,
            where: whereAttributes
        });
        return data;
    }

    public async create(data: TLeadPayload): Promise<ILead> {
        const response = await LeadsModel.create(data);
        return response;
    }
}
