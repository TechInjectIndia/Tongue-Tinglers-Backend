import {Op} from "sequelize";
import {
    TProductCategory,
    TProductCategoryFilters,
    TProductCategorysList,
    TAddProductCategory,
} from "../../../types/ecommerce";
import { Category } from "../../../database/schema";

export class ProductCategoryModel {
    constructor() { }

    public async getProductCategoryByName(name: string): Promise<TProductCategory | any> {
        const data = await Category.findOne({
            where: {
                name,
            },
        });
        return data;
    }

    public async getProductCategoryById(id: number): Promise<TProductCategory | any> {
        const data = await Category.findOne({
            where: {
                id,
            },
        });
        return data;
    }

    public async list(filters: TProductCategoryFilters): Promise<TProductCategorysList> {
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
        return { total, data };
    }

    public async create(data: TAddProductCategory): Promise<TProductCategory> {
        const response = await Category.create(data);
        return response;
    }

    public async update(id: number, data: TAddProductCategory): Promise<TProductCategory | any> {
        const response = await Category.update(data, {
            where: {
                id,
            },
        });
        return response;
    }

    public async delete(ids: number[]): Promise<TProductCategory | any> {
        const response = await Category.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
