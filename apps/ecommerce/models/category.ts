import { Op } from "sequelize";
import { CategoryModel } from "../../../database/schema";
import { TAddProductCategory, TProductCategory, TProductCategoryFilters } from "../../../types/ecommerce";

export class ProductCategoryRepo {
    constructor() { }

    // Retrieve a product category by its name
    public async getProductCategoryByName(name: string): Promise<TProductCategory | null> {
        const category = await CategoryModel.findOne({
            where: { name }
        });
        return category ? category.toJSON() as TProductCategory : null;
    }

    // Retrieve a product category by its ID
    public async getProductCategoryById(id: number): Promise<TProductCategory | null> {
        const category = await CategoryModel.findByPk(id);
        return category ? category.toJSON() as TProductCategory : null;
    }

    // List product categories with filters
    public async list(filters: TProductCategoryFilters): Promise<TProductCategory[]> {
        const { search = '', limit = 10, offset = 0, sorting = [['createdAt', 'DESC']] } = filters;

        const categories = await CategoryModel.findAll({
            where: {
                name: {
                    [Op.like]: `%${search}%`,
                },
            },
            limit,
            offset,
        });

        return categories.map(category => category.toJSON() as TProductCategory);
    }

    // Create a new product category
    public async create(data: TAddProductCategory): Promise<TProductCategory> {
        const category = await CategoryModel.create(data);
        return category.toJSON() as TProductCategory;
    }

    // Update a product category by its ID
    public async update(id: number, data: TAddProductCategory): Promise<[affectedCount: number]> {
        const res = await CategoryModel.update(data, {
            where: { id },
        });
        return res;
    }

    // Delete product categories by their IDs
    public async delete(ids: number[]): Promise<number> {
        return await CategoryModel.destroy({
            where: { id: ids },
        });
    }
}
