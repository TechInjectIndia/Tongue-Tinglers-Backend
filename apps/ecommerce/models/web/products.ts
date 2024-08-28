const { Op } = require("sequelize");
import {
    TProduct,
    TProductFilters,
    TProductsList,
    TProductSearch,
} from "../../../../types/ecommerce";
import { Product } from "../../../../database/schema";

export class ProductModel {
    constructor() { }

    public async getProductByName(name: string): Promise<TProduct | any> {
        const data = await Product.findOne({
            where: {
                name,
                active: true,
            },
        });
        return data;
    }

    public async getProductByTag(type: string, limit: number): Promise<TProduct | any> {
        const data = await Product.findAll({
            where: {
                type,
                active: true,
            },
        });
        return data;
    }

    public async getProductBySlug(slug: string): Promise<TProduct | any> {
        const data = await Product.findOne({
            where: {
                slug,
                active: true,
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
                active: true,
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
                active: true,
            },
        });
        return { total, data };
    }

    public async search(filters: TProductSearch): Promise<TProductsList | any> {
        const total = await Product.count({
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`,
                },
                active: true,
            },
        });
        const data = await Product.findAll({
            order: [filters?.sorting],
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`,
                },
                active: true,
            },
        });
        return { total, data };
    }
}
