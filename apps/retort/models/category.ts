const { Op } = require("sequelize");
import {
    TRetortProductCategory,
    TRetortProductCategoryFilters,
    TRetortProductCategorysList,
    TAddRetortProductCategory,
    TEditRetortProductCategory,
} from "../../../types/retort";
import { RetortProductCategoryModel, RetortCategoryImageModel } from "../../../database/schema";
import IBaseRepo from '../controllers/controller/category/IProductsCategoryController';

export class RetortProductCategoryRepo implements IBaseRepo<TRetortProductCategory, TRetortProductCategoryFilters> {
    constructor() { }

    public async getRetortProductCategoryByName(name: string): Promise<TRetortProductCategory> {
        const data = await RetortProductCategoryModel.findOne({
            where: {
                name,
            },
        });
        return data;
    }

    public async get(id: number): Promise<TRetortProductCategory> {
        const data = await RetortProductCategoryModel.findOne({
            where: {
                id,
            },
            include: [{
                model: RetortCategoryImageModel,
                as: 'images'
            }]
        });
        return data;
    }

    public async list(filters: TRetortProductCategoryFilters): Promise<TRetortProductCategorysList> {
        const total = await RetortProductCategoryModel.count({
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await RetortProductCategoryModel.findAll({
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

    public async create(data: TAddRetortProductCategory): Promise<TRetortProductCategory> {
        const response = await RetortProductCategoryModel.create(data);
        return response;
    }

    public async update(id: number, data: TEditRetortProductCategory): Promise<[affectedCount: number]> {
        const response = await RetortProductCategoryModel.update(data, {
            where: {
                id,
            },
        });
        return response;
    }

    public async delete(ids: number[]): Promise<number> {
        const response = await RetortProductCategoryModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
