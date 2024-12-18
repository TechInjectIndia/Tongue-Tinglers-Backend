const { Op } = require("sequelize");

import { InquiryModel } from "../../../database/schema";
import { TQueryFilters } from "../../../types";
import { TInquiry, TInquirysList, TAddInquiry, TEditInquiry } from "../../../types/crm/crm";
import IBaseRepo from '../controllers/controller/IInquiryController';

export class InquiryRepo implements IBaseRepo<TInquiry, TQueryFilters> {
    constructor() { }

    public async get(id: number): Promise<TInquiry | null> {
        const data = await InquiryModel.findOne({
            where: {
                id,
            },
        });
        return data;
    }

    public async list(filters: TQueryFilters): Promise<TInquirysList> {
        const total = await InquiryModel.count({
            where: {
                email: {
                    [Op.iLike]: `%${filters.search}%`,
                },
            },
        });
        const data = await InquiryModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                email: {
                    [Op.iLike]: `%${filters.search}%`,
                },
            },
        });
        return { total, data };
    }

    public async create(data: TAddInquiry): Promise<TInquiry> {
        const response = await InquiryModel.create(data);
        return response;
    }

    public async update(id: number, data: TEditInquiry): Promise<[affectedCount: number]> {
        const response = await InquiryModel.update(data, {
            where: {
                id,
            },
        });
        return response;
    }

    public async delete(ids: number[]): Promise<number> {
        const response = await InquiryModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
