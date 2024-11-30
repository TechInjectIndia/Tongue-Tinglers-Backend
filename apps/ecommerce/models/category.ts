const { Op } = require("sequelize");
import {
    TProductCategory,
    TProductCategoryFilters,
    TProductCategorysList,
    TAddProductCategory,
    TEditProductCategory,
} from "../../../types/ecommerce";
import { ProductCategoryModel, CategoryImageModel, ProductsModel, ProductImagesModel, StockModel } from "../../../database/schema";
import IBaseRepo from '../controllers/controller/category/IProductsCategoryController';

export class ProductCategoryRepo implements IBaseRepo<TProductCategory, TProductCategoryFilters> {
    constructor() { }

    public async listAllCategoriesWithProducts(): Promise<TProductCategory[]> {
        const categories = await ProductCategoryModel.findAll({
            include: [{
                model: ProductsModel,
                as: 'products',
                include: [{
                    model: ProductImagesModel,
                    as: 'images',
                },
                {
                    model: StockModel,
                    as: 'stock',
                }
                ],
            }],
        });

        return categories;
    }

    public async getProductCategoryByName(name: string): Promise<TProductCategory> {
        const data = await ProductCategoryModel.findOne({
            where: {
                name,
            },
        });
        return data;
    }

    public async get(id: number): Promise<TProductCategory> {
        const data = await ProductCategoryModel.findOne({
            where: {
                id,
            },
            include: [{
                model: CategoryImageModel,
                as: 'images'
            }]
        });
        return data;
    }

    public async list(filters: TProductCategoryFilters): Promise<TProductCategorysList> {
        const total = await ProductCategoryModel.count({
            where: {
                name: {
                    [Op.iLike]: `%${filters.search}%`,
                },
            },
        });
        const data = await ProductCategoryModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                name: {
                    [Op.iLike]: `%${filters.search}%`,
                },
            },
        });
        return { total, data };
    }

    public async create(data: TAddProductCategory): Promise<TProductCategory> {
        const response = await ProductCategoryModel.create(data);
        return response;
    }

    public async update(id: number, data: TEditProductCategory): Promise<[affectedCount: number]> {
        const response = await ProductCategoryModel.update(data, {
            where: {
                id,
            },
        });
        return response;
    }

    public async delete(ids: number[]): Promise<number> {
        const response = await ProductCategoryModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
