const { Op } = require("sequelize");
import {
    TRetortProduct,
    TRetortProductFilters,
    TRetortProductsList,
    TEditRetortProduct,
    TAddRetortProduct,
} from "../../../types";
import { RetortProductsModel, RetortProductImagesModel, RetortProductCategoryModel } from "../../../database/schema";
import IBaseRepo from '../controllers/controller/product/IProductsController';

export class RetortProductRepo implements IBaseRepo<TRetortProduct, TRetortProductFilters> {
    constructor() { }

    public async create(data: TAddRetortProduct): Promise<TRetortProduct> {
        const response = await RetortProductsModel.create(data);
        return response;
    }

    public async getProductByName(name: string): Promise<TRetortProduct> {
        const data = await RetortProductsModel.findOne({
            where: {
                name,
            },
        });
        return data;
    }

    public async get(id: number): Promise<TRetortProduct> {
        const data = await RetortProductsModel.findOne({
            where: {
                id,
            },
            include: [{
                model: RetortProductImagesModel,
                as: 'images'
            },
            {
                model: RetortProductCategoryModel,
                as: 'categories',
                through: {
                    attributes: ['id'],
                }
            },]
        });
        return data;
    }

    public async list(filters: TRetortProductFilters): Promise<TRetortProductsList> {
        const total = await RetortProductsModel.count({
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await RetortProductsModel.findAll({
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

    public async update(id: number, data: TEditRetortProduct): Promise<[affectedCount: number]> {
        const response = await RetortProductsModel.update(data, {
            where: {
                id,
            },
        });
        return response;
    }

    public async delete(ids: number[]): Promise<number> {
        const response = await RetortProductsModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
