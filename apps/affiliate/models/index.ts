const { Op } = require("sequelize");
import {
    Affiliate,
    AffiliatesList,
    TPayloadAffiliate,
} from "../../../interfaces";
import {
    TListFilters,
} from "../../../types";
import { AffiliateModel } from "../../../database/schema";
import IBaseRepo from '../controllers/controller/IController';

export class AffiliateRepo implements IBaseRepo<Affiliate, TListFilters> {
    constructor() { }

    public async get(id: number): Promise<Affiliate | null> {
        const data = await AffiliateModel.findOne({
            where: {
                id,
            },
        });
        return data;
    }

    public async list(filters: TListFilters): Promise<AffiliatesList> {
        const total = await AffiliateModel.count({
            where: {
                type: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await AffiliateModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                type: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        return { total, data };
    }

    public async create(data: TPayloadAffiliate): Promise<Affiliate> {
        const response = await AffiliateModel.create(data);
        return response;
    }

    public async update(id: number, data: TPayloadAffiliate): Promise<[affectedCount: number]> {
        return await AffiliateModel.update(data, {
            where: {
                id: id,
            },
        });
    }

    public async delete(ids: number[]): Promise<number> {
        const response = await AffiliateModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
