import { Op } from "sequelize";

import { Category, ProductCategoryAttributes } from "../../../database/schema";
import { TAddProductCategory, TProductCategoryFilters } from "../../../types/ecommerce";

export class ProductCategoryModel {
    constructor() { }

    public async getProductCategoryByName(name: string): Promise<Category> {
        const data = await Category.findOne({
            where: {
                name,
            },
        });
        return data;
    }

    public async getProductCategoryById(id: number): Promise<Category> {
        const data = await Category.findOne({
            where: {
                id,
            },
        });
        return data;
    }

    public async list(filters: TProductCategoryFilters): Promise<Category[]> {
        const total = await Category.count({
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await Category.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        return data;
    }

    public async create(data: TAddProductCategory): Promise<Category> {
        const response = await Category.create(data);
        return response;
    }

    public async update(id: number, data: TAddProductCategory): Promise<[affectedCount: number]> {
        const response = await Category.update(data, {
            where: {
                id,
            },
        });
        return response;
    }

    public async delete(ids: number[]): Promise<number> {
        const response = await Category.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
