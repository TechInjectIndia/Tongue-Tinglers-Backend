const { Op } = require("sequelize");
import {
    TProduct,
    TProductFilters,
    TProductsList,
    TProductSearch,
} from "../../../../types/ecommerce";
import { ProductsModel } from "../../../../database/schema";
import IBaseRepo from '../../controllers/controller/product/IWebProductsController';

export class WebProductRepo implements IBaseRepo<TProduct, TProductFilters> {
    constructor() { }

    public async getProductByName(name: string): Promise<TProduct> {
        const data = await ProductsModel.findOne({
            where: {
                name,
                active: true,
            },
        });
        return data;
    }

    public async getProductByTag(type: string, limit: number): Promise<TProductsList> {
        const total = await ProductsModel.count({
            where: {
                type: type,
                active: true,
            },
        });
        const data = await ProductsModel.findAll({
            limit: limit,
            where: {
                type: type,
                active: true,
            },
        });
        return { total, data };
    }

    public async getProductBySlug(slug: string): Promise<TProduct> {
        const data = await ProductsModel.findOne({
            where: {
                slug,
                active: true,
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
                active: true,
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
                active: true,
            },
        });
        return { total, data };
    }

    public async search(filters: TProductSearch): Promise<TProductsList> {
        const total = await ProductsModel.count({
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`,
                },
                active: true,
            },
        });
        const data = await ProductsModel.findAll({
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
