import { BaseProduct, CHANGE_STATUS, Pagination, Product, PRODUCT_STATUS, PRODUCTS_TYPE } from "../../../interfaces/products";
import { IProductRepo } from "./IProductRepo";
import { ProductModel } from "../../../database/schema/product/productModel";
import { Op } from "sequelize";
export class ProductRepo implements IProductRepo {
    async create(product: BaseProduct): Promise<Product | null> {
        try {
            return (await ProductModel.create({
                name: product.name,
                slug: product.slug,
                description: product.description,
                MOQ: product.MOQ,
                category: product.category,
                type: product.type,
                status: product.status,
                images: product.images,
                variationIds: product.variationIds
            })).toJSON();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async update(product: Product): Promise<Product> {
        try {
            // Find the product by its primary key (ID)
            const existingProduct = await ProductModel.findByPk(product.id)
            if (!existingProduct) {
                throw new Error(`Product with ID ${product.id} not found`);
            }
            await existingProduct.update(product);
            return existingProduct.toJSON();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getAll(page: number, limit: number, search: string, filters: object): Promise<Pagination<Product>> {
        try {
            const offset = (page - 1) * limit;

            const query: any = {};

            // Add search functionality
            if (search) {
                query[Op.or] = [
                    { name: { [Op.iLike]: `%${search}%` } },
                    { description: { [Op.iLike]: `%${search}%` } },
                ];
            }

            // Add filters
            if (filters) {
                Object.assign(query, filters);
            }

            const { rows: products, count: total } = await ProductModel.findAndCountAll({
                where: query,
                offset,
                limit,
                order: [['createdAt', 'DESC']],
            }).then((res) => {
                return {
                    rows: res.rows.map((product) => product.toJSON()),
                    count: res.count
                }
            })

            const totalPages = Math.ceil(total / limit);

            return { data: products, total, totalPages };


        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getById(id: number): Promise<Product | null> {
        try {
            // Fetch product by primary key (ID)
            const product = (await ProductModel.findByPk(id)).toJSON();

            if (!product) {
                throw new Error(`Product with ID ${id} not found`);
            }

            return product;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async delete(id: number): Promise<Product> {
        try {
            const existingProduct = await ProductModel.findByPk(id);
            if (!existingProduct) {
                throw new Error(`Product with ID ${id} not found`);
            }

            await existingProduct.update({ status: PRODUCT_STATUS.INACTIVE });

            return existingProduct.toJSON();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async changeStatus(payload: CHANGE_STATUS): Promise<Product> {
        try {
            // Find the product by its primary key
            const { id, status } = payload

            // Check if the status is one of the allowed ENUM values
            const validStatuses = ['active', 'inactive'];
            if (!validStatuses.includes(status)) {
                throw new Error(
                    `Invalid status value. Status must be one of: ${validStatuses.join(', ')}`
                );
            }
            const product = await ProductModel.findByPk(id);

            if (!product) {
                throw new Error(`Product with ID ${id} not found.`);
            }

            // Update the status field
            await product.update({ status });

            return product.toJSON();

        } catch (error) {
            console.log(error);
            return null;
        }
    }
} 