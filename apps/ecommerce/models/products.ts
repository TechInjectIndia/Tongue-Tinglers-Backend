const { Op } = require("sequelize");
import {
    TProduct,
    TProductFilters,
    TProductsList,
    TEditProduct,
    TAddProduct,
} from "../../../types/ecommerce";
import { ProductsModel } from "../../../database/schema";
import IBaseRepo from '../controllers/controller/product/IProductsController';

export class ProductRepo implements IBaseRepo<TProduct, TProductFilters> {
    constructor() { }

    public async create(data: TAddProduct): Promise<TProduct> {
        const response = await ProductsModel.create(data);
        return response;
    }

    public async getProductByName(name: string): Promise<TProduct> {
        const data = await ProductsModel.findOne({
            where: {
                name,
            },
        });
        return data;
    }

    public async get(id: number): Promise<TProduct> {
        const data = await ProductsModel.findOne({
            where: {
                id,
            },
        });
        return data;
    }

    public async list(filters: TProductFilters): Promise<TProductsList> {
        const total = await ProductsModel.count({
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await ProductsModel.findAll({
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

    public async update(id: number, data: TEditProduct): Promise<[affectedCount: number]> {
        const response = await ProductsModel.update(data, {
            where: {
                id,
            },
        });
        return response;
    }

    public async delete(ids: number[]): Promise<number> {
        const response = await ProductsModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
