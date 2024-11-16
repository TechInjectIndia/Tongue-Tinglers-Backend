const { Op } = require("sequelize");
import {
    FranchiseModels,
    FranchiseModelsList,
    TPayloadFranchiseModel,
} from "../../../interfaces";
import {
    TListFilters,
} from "../../../types";
import { FranchiseLeadModel } from "../../../database/schema";
import { ExtraFieldsModel } from "../../../database/schema";
import { SeoImageModel } from "../../../database/schema";
import IBaseRepo from '../controllers/controller/IController';

export class FranchiseModelRepo implements IBaseRepo<FranchiseModels, TListFilters> {
    constructor() { }

    public async get(id: string): Promise<FranchiseModels | null> {
        const data = await FranchiseLeadModel.findOne({
            where: {
                id,
            },
            include: [
                {
                    model: ExtraFieldsModel,
                    as: 'others',
                },
                {
                    model: SeoImageModel,
                    as: 'images',
                }
            ],
        });
        return data;
    }

    public async list(filters: TListFilters): Promise<FranchiseModelsList> {
        const total = await FranchiseLeadModel.count({
            where: {
                title: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await FranchiseLeadModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                title: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        return { total, data };
    }

    public async create(data: TPayloadFranchiseModel): Promise<FranchiseModels> {
        const response = await FranchiseLeadModel.create(data);
        return response;
    }

    public async update(id: string, data: TPayloadFranchiseModel): Promise<[affectedCount: number]> {
        return await FranchiseLeadModel.update(data, {
            where: {
                id: id,
            },
        });
    }

    public async delete(ids: string[]): Promise<number> {
        const response = await FranchiseLeadModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
