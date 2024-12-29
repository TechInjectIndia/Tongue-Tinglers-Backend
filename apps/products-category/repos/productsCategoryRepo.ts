
import { Op } from "sequelize";
import { IProductsCategoryRepo } from "./IProductsCategoryRepo";
import { BaseProductsCategory, PRODUCT_CATEGORY_STATUS, ProductsCategory } from "../interface/Category";
import { ProductsCategoryModel } from "database/schema/product-category/productCategoryModel";
import { Pagination } from "apps/common/models/common";

export class ProductsCategoryRepo implements IProductsCategoryRepo {
    async createProductsCategory(category: BaseProductsCategory): Promise<ProductsCategory | null> {
        try {
            const newCategory = await ProductsCategoryModel.create({
                name: category.name,
                slug: category.slug,
                description: category.description,
                status: category.status,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            })
            
            return newCategory.toJSON();
        } catch (error) {
            console.log(error);
            return null; 
        }
    }

    async getProductsCategoryById(id: number): Promise<ProductsCategory> {
        try {
            const category = await ProductsCategoryModel.findOne({
                where: {
                    id: id
                }
            })

            return category?.toJSON();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getProductsCategoryBySlug(slug: string): Promise<ProductsCategory> {
        try {
            const category = await ProductsCategoryModel.findOne({
                where: {
                    slug: slug
                }
            })

            return category?.toJSON();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    // async getAllProductsCategory(page: number, limit: number, search: string): Promise<Pagination<ProductsCategory>> {
    //     try {
    //         const offset = (page - 1) * limit;

    //         const query: any = {};

    //         // Add search functionality
    //         if (search) {
    //             query[Op.or] = [
    //                 { name: { [Op.iLike]: `%${search}%` } },
    //                 { description: { [Op.iLike]: `%${search}%` } },
    //             ];
    //         }

    //         const { rows: products_category, count: total } = await ProductsCategoryModel.findAndCountAll({
    //             where: query,
    //             offset,
    //             limit,
    //             order: [['createdAt', 'DESC']]
    //         }).then((res)=>{
    //             return {
    //                 rows: res.rows.map((productsCategory) => productsCategory.toJSON()),
    //                 count: res.count
    //             }
    //         })

    //         const totalPages = Math.ceil(total / limit);

    //         return { products_category, total, totalPages };

    //     } catch (error) {
    //         console.log(error);
    //         return null;
    //     }
    // }

    async updateProductsCategory(category: ProductsCategory): Promise<ProductsCategory> {
        try {
            const existingProductsCategory = await ProductsCategoryModel.findByPk(category.id);
            if (!existingProductsCategory) {
                throw new Error(`Products Category with ID ${category.id} not found`);
            }
            await existingProductsCategory.update(category);
            return existingProductsCategory.toJSON();

        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async deleteProductsCategory(id: number): Promise<ProductsCategory> {
        try {
            const existingProductsCategory = await ProductsCategoryModel.findByPk(id);
            if (!existingProductsCategory) {
                throw new Error(`Products Category with ID ${id} not found`);
            }
            await existingProductsCategory.update({ status: PRODUCT_CATEGORY_STATUS.INACTIVE });
            return existingProductsCategory.toJSON();
        } catch (error) {
            console.log(error);
            return null;  
        }
    }

    async changeStatus(payload): Promise<ProductsCategory> {
        try {
            const { id, status } = payload;

            // Check if the status is one of the allowed ENUM values
            const validStatuses = ['active', 'inactive'];
            if (!validStatuses.includes(status)) {
                throw new Error(
                    `Invalid status value. Status must be one of: ${validStatuses.join(', ')}`
                );
            }

            const productsCategory = await ProductsCategoryModel.findByPk(id);

            if (!productsCategory) {
                throw new Error(`Products Category with ID ${id} not found.`);
            }

            // Update the status field
            await productsCategory.update({ status });

            return productsCategory.toJSON();
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}