const { Op } = require("sequelize");
import {
    TProduct,
    TProductFilters,
    TProductsList,
    TAddProduct,
} from "../../../types/ecommerce";
import { Product } from "../../../database/schema";

export class ProductModel {
    constructor() { }

    public async create(data: TAddProduct): Promise<TProduct | any> {
        const response = await Product.create(data);
        return response;
    }

    public async getProductByName(name: string): Promise<TProduct | any> {
        const data = await Product.findOne({
            where: {
                name,
            },
        });
        return data;
    }

    public async getProductById(id: number): Promise<TProduct | any> {
        const data = await Product.findOne({
            where: {
                id,
            },
        });
        return data;
    }

    public async list(filters: TProductFilters): Promise<TProductsList | any> {
        const total = await Product.count({
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await Product.findAll({
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

    public async update(id: number, data: TAddProduct): Promise<TProduct | any> {
        const response = await Product.update(data, {
            where: {
                id,
            },
        });
        return response;
    }

    public async delete(ids: number[]): Promise<TProduct | any> {
        const response = await Product.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
