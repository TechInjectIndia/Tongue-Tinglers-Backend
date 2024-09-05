const { Op } = require("sequelize");
import {
    TProductTag,
    TProductTagFilters,
    TProductTagsList,
    TAddProductTag,
} from "../../../types/ecommerce";
import { ProductTagModel, TagImageModel } from "../../../database/schema";

import IBaseRepo from '../controllers/controller/tag/IProductTagController';

export class ProductTagRepo implements IBaseRepo<TProductTag, TProductTagFilters> {
    constructor() { }

    public async getTagByName(name: string): Promise<TProductTag> {
        const data = await ProductTagModel.findOne({
            where: {
                name,
            },
        });
        return data;
    }

    public async get(id: number): Promise<TProductTag> {
        const data = await ProductTagModel.findOne({
            where: {
                id,
            },
            include: [{
                model: TagImageModel,
                as: 'images'
            }]
        });
        return data;
    }

    public async list(filters: TProductTagFilters): Promise<TProductTagsList> {
        const total = await ProductTagModel.count({
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await ProductTagModel.findAll({
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

    public async create(data: TAddProductTag): Promise<TProductTag> {
        const response = await ProductTagModel.create(data);
        return response;
    }

    public async update(id: number, data: TAddProductTag): Promise<[affectedCount: number]> {
        const response = await ProductTagModel.update(data, {
            where: {
                id,
            },
        });
        return response;
    }

    public async delete(ids: number[]): Promise<number> {
        const response = await ProductTagModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
