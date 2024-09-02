const { Op } = require("sequelize");
import {
    TLeadStatus,
    TAssignLead,
    TLead,
    TLeadFilters,
    TLeadsList,
    TAddLead,
} from "../../../types/lead";
import { LeadsModel } from "../../../database/schema";

export class LeadModel {
    constructor() { }

    public async getLeadStatus(whereName: any, whereVal: any, getAttributes: any = '*'): Promise<TLeadStatus | any> {
        const whereAttributes = { [whereName]: whereVal }
        const data = await LeadsModel.findOne({
            raw: true,
            attributes: getAttributes,
            where: whereAttributes
        });
        return data;
    }

    public async getLeadByAttr(whereName: any, whereVal: any, getAttributes: any = '*'): Promise<TLead | any> {
        const whereAttributes = { [whereName]: whereVal }
        const data = await LeadsModel.findOne({
            raw: true,
            attributes: getAttributes,
            where: whereAttributes
        });
        return data;
    }

    public async list(filters: TLeadFilters): Promise<TLeadsList | any> {
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

    public async add(data: TAddLead): Promise<TLead | any> {
        const response = await LeadsModel.create(data);
        return response;
    }

    public async update(id: number, data: TAddLead): Promise<TLead | any> {
        const response = await LeadsModel.update(data, {
            where: {
                id,
            },
        });
        return response;
    }

    public async assignLeadToUser(id: number, data: TAssignLead): Promise<TLead | any> {
        const response = await LeadsModel.update(data, {
            where: {
                id,
            },
        });
        return response;
    }

    public async delete(ids: number[]): Promise<TLead | any> {
        const response = await LeadsModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
