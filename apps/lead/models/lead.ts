import {Op} from "sequelize";
import {
    TLead,
    TLeadFilters,
    TLeadsList,
    TAddLead,
} from "../../../types/lead";
import { Lead } from "../../../database/schema";

export class LeadModel {
    constructor() { }

    public async getLeadByAttr(whereName: any, whereVal: any, getAttributes: any = '*'): Promise<TLead | any> {
        const whereAttributes = { [whereName]: whereVal }
        const data = await Lead.findOne({
            raw: true,
            attributes: getAttributes,
            where: whereAttributes
        });
        return data;
    }

    public async list(filters: TLeadFilters): Promise<TLeadsList | any> {
        const total = await Lead.count({
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await Lead.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        return { total, data };
    }

    public async add(data: TAddLead): Promise<TLead | any> {
        const response = await Lead.create(data);
        return response;
    }

    public async update(id: number, data: TAddLead): Promise<TLead | any> {
        const response = await Lead.update(data, {
            where: {
                id,
            },
        });
        return response;
    }

    public async delete(ids: number[]): Promise<TLead | any> {
        const response = await Lead.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
