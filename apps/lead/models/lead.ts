const { Op } = require("sequelize");
import {
    TLeadStatus,
    TAssignLead,
    TEditLead,
    TLead,
    TListFilters,
    TLeadsList,
    TAddLead,
    TLeadStatusUpdate
} from "../../../types";
import { LeadsModel } from "../../../database/schema";
import IBaseRepo from '../controllers/controller/ILeadController';
import { LEAD_STATUS } from '../../../interfaces';

export class LeadRepo implements IBaseRepo<TLead, TListFilters> {
    constructor() { }

    public async updateStatus(id: number, data: TLeadStatusUpdate): Promise<[affectedCount: number]> {
        const response = await LeadsModel.update(data, {
            where: {
                id,
            },
        });
        return response;
    }

    public async getLeadStatus(whereName: any, whereVal: any, getAttributes: any = ['*']): Promise<TLeadStatus> {
        const whereAttributes = { [whereName]: whereVal }
        const data = await LeadsModel.findOne({
            raw: true,
            attributes: getAttributes,
            where: whereAttributes
        });
        return data;
    }

    public async getLeadByAttr(whereName: any, whereVal: any, getAttributes: any = ['*']): Promise<TLead> {
        const whereAttributes = { [whereName]: whereVal }
        const data = await LeadsModel.findOne({
            raw: true,
            attributes: getAttributes,
            where: whereAttributes
        });
        return data;
    }

    public async getLeadByStatus(id: number): Promise<TLead> {
        const data = await LeadsModel.findOne({
            where: {
                id: id,
                status: LEAD_STATUS.NEW
            },
        });
        return data;
    }

    public async checkLeadExist(email: string, excludeId: number): Promise<TLead> {
        const data = await LeadsModel.findOne({
            where: {
                email: email,
                id: { [Op.ne]: excludeId }, // Sequelize.Op.ne means "not equal"
            },
        });
        return data;
    }

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
        return { total, data };
    }

    public async create(data: TAddLead): Promise<TLead> {
        const response = await LeadsModel.create(data);
        return response;
    }

    public async update(id: number, data: TEditLead): Promise<[affectedCount: number]> {
        const response = await LeadsModel.update(data, {
            where: {
                id,
            },
        });
        return response;
    }

    public async assignLeadToUser(id: number, data: TAssignLead): Promise<[affectedCount: number]> {
        const response = await LeadsModel.update(data, {
            where: {
                id,
            },
        });
        return response;
    }

    public async delete(ids: number[]): Promise<number> {
        const response = await LeadsModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
