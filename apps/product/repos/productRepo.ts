import { IProductRepo } from "./IProductRepo";

import { Op } from "sequelize";

import { parseProduct } from "../parser/productParser";

import { UserModel } from "apps/user/models/UserTable";
import { OptionsValueModel } from "apps/optionsValue/models/OptionValueTable";
import { OptionsModel } from "apps/options/models/optionTable";
import { ProductModel } from "apps/product/model/productTable";
import { ProductsCategoryModel } from "apps/products-category/models/ProductCategoryTable";
import { ProductVariationsModel } from "../../product-options/models/ProductVariationTable";
import {
    BaseProduct,
    IProductTable,
    ParsedProduct,
    CHANGE_STATUS,
    PRODUCT_STATUS,
    PRODUCTS_TYPE,
} from "apps/product/interface/Product";
import { Pagination } from "../../common/models/common";

export class ProductRepo implements IProductRepo {
    async create(product: BaseProduct, createdBy: number): Promise<IProductTable | null> {
        // const transaction = await ProductModel.sequelize.transaction();

        try {
            let variationIds: number[] = []; // Array to store created option IDs

            // Step 1: Create the product with a default empty array for `variationIds`
            const createdProduct = await ProductModel.create(
                {
                    name: product.name,
                    slug: product.slug,
                    description: product.description,
                    MOQ: product.MOQ,
                    category: product.category,
                    type: product.type,
                    status: product.status,
                    images: product.images,
                    vendorId: product.vendorId, // Initialize with an empty array
                    tax_rate_id: product.tax_rate_id,
                    createdBy,
                }
                // { transaction },
            );

            // Step 2: Handle variations if provided
            if (product.variations && Array.isArray(product.variations)) {
                const productOptions = product.variations.map((option) => ({
                    product_id: createdProduct.id, // Link the option to the created product
                    optionValueId: option.optionValueId,
                    price: option.price,
                    stock: option.stock,
                    status: option.status,
                    images: option.images,
                }));

                // Bulk create the product options
                const createdOptions = await ProductVariationsModel.bulkCreate(productOptions, {
                    // transaction,
                    returning: true, // Ensure the created options are returned
                });

                variationIds = createdOptions.map((option) => option.id);

                // Update the product with the created option IDs
            }

            console.log(createdProduct.addVariations(variationIds));
            // await createdProduct.addVariations(variationIds, transaction);

            // Commit the transaction
            // await transaction.commit();

            // Return the created product
            return createdProduct.toJSON();
        } catch (error) {
            console.error("Error creating product:", error);

            // Rollback the transaction in case of error
            // await transaction.rollback();

            return null;
        }
    }

    async update(product: IProductTable): Promise<IProductTable> {
        try {
            // Find the product by its primary key (ID)
            const existingProduct = await ProductModel.findByPk(product.id, {
                include: [{ model: ProductVariationsModel, as: "productOptions" }],
            });
            if (!existingProduct) {
                throw new Error(`IProductTable with ID ${product.id} not found`);
            }
            await existingProduct.update(product);
            return existingProduct.toJSON();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getAll(
        page: number,
        limit: number,
        search: string,
        filters: object
    ): Promise<Pagination<ParsedProduct>> {
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

            // exclude sample ki
            query["type"] = { [Op.ne]: PRODUCTS_TYPE.SAMPLE_KIT };

            const { rows: products, count: total } = await ProductModel.findAndCountAll({
                where: query,
                offset,
                limit,
                order: [["createdAt", "DESC"]],

                include: [
                    {
                        model: ProductVariationsModel, // Include the ProductOptions model
                        as: "variations", // Alias used in the ProductModel association
                        attributes: ["id", "optionValueId", "price", "stock", "status", "images"], // Only fetch these fields
                        include: [
                            {
                                model: OptionsValueModel,
                                as: "optionsValue", // Include these fields from the User model
                                attributes: ["id", "name", "option_id"],
                                include: [
                                    {
                                        model: OptionsModel,
                                        as: "options",
                                        attributes: ["id", "name"],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        model: UserModel,
                        as: "createdByUser", // Include createdByUser
                        attributes: ["id", "firstName", "lastName", "email"], // Include these fields from the User model
                    },
                    {
                        model: UserModel,
                        as: "updatedByUser", // Include createdByUser
                        attributes: ["id", "firstName", "lastName", "email"], // Include these fields from the User model
                    },
                    {
                        model: UserModel,
                        as: "deletedByUser", // Include createdByUser
                        attributes: ["id", "firstName", "lastName", "email"], // Include these fields from the User model
                    },
                    {
                        model: ProductsCategoryModel,
                        as: "productCategory", // Include createdByUser
                        attributes: ["id", "name", "description"], // Include these fields from the User model
                    },
                ],
            }).then((res) => {
                return {
                    rows: res.rows.map((product) => parseProduct(product.toJSON())),
                    count: res.count,
                };
            });

            const totalPages = Math.ceil(products.length / limit);

            return { data: products, total: products.length, totalPages };
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getById(id: number): Promise<ParsedProduct | null> {
        try {
            // Fetch product by primary key (ID)
            const product = await ProductModel.findByPk(id, {
                include: [
                    {
                        model: ProductVariationsModel, // Include the ProductOptions model
                        as: "variations", // Alias used in the ProductModel association
                        attributes: ["id", "optionValueId", "price", "stock", "status", "images"], // Only fetch these fields
                        include: [
                            {
                                model: OptionsValueModel,
                                as: "optionsValue", // Include these fields from the User model
                                attributes: ["id", "name", "option_id"],
                                include: [
                                    {
                                        model: OptionsModel,
                                        as: "options",
                                        attributes: ["id", "name"],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        model: UserModel,
                        as: "createdByUser", // Include createdByUser
                        attributes: ["id", "firstName", "lastName", "email"], // Include these fields from the User model
                    },
                    {
                        model: UserModel,
                        as: "updatedByUser", // Include createdByUser
                        attributes: ["id", "firstName", "lastName", "email"], // Include these fields from the User model
                    },
                    {
                        model: UserModel,
                        as: "deletedByUser", // Include createdByUser
                        attributes: ["id", "firstName", "lastName", "email"], // Include these fields from the User model
                    },
                    {
                        model: ProductsCategoryModel,
                        as: "productCategory", // Include createdByUser
                        attributes: ["id", "name", "description", "slug", "type", "status"], // Include these fields from the User model"
                    },
                ],
            }).then((productData) => {
                return productData ? parseProduct(productData.toJSON()) : null;
            });

            return product;

            // return product.toJSON();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async delete(id: number): Promise<IProductTable> {
        try {
            const existingProduct = await ProductModel.findByPk(id);
            if (!existingProduct) {
                throw new Error(`IProductTable with ID ${id} not found`);
            }

            await existingProduct.update({ status: PRODUCT_STATUS.INACTIVE });

            return existingProduct.toJSON();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async changeStatus(payload: CHANGE_STATUS): Promise<IProductTable> {
        try {
            // Find the product by its primary key
            const { id, status } = payload;

            // Check if the status is one of the allowed ENUM values
            const validStatuses = ["active", "inactive"];
            if (!validStatuses.includes(status)) {
                throw new Error(
                    `Invalid status value. Status must be one of: ${validStatuses.join(", ")}`
                );
            }
            const product = await ProductModel.findByPk(id);

            if (!product) {
                throw new Error(`IProductTable with ID ${id} not found.`);
            }

            // Update the status field
            await product.update({ status });

            return product.toJSON();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getAllProductBySamplekit(
        page: number,
        limit: number
    ): Promise<Pagination<ParsedProduct>> {
        try {
            const offset = (page - 1) * limit;
            const { rows: products, count: total } = await ProductModel.findAndCountAll({
                offset,
                limit,
                order: [["id", "ASC"]],
                where: {
                    type: PRODUCTS_TYPE.SAMPLE_KIT,
                },
                include: [
                    {
                        model: ProductVariationsModel, // Include the ProductOptions model
                        as: "variations", // Alias used in the ProductModel association
                        attributes: ["id", "optionValueId", "price", "stock", "status", "images"], // Only fetch these fields
                        include: [
                            {
                                model: OptionsValueModel,
                                as: "optionsValue", // Include these fields from the User model
                                attributes: ["id", "name", "option_id"],
                                include: [
                                    {
                                        model: OptionsModel,
                                        as: "options",
                                        attributes: ["id", "name"],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        model: UserModel,
                        as: "createdByUser", // Include createdByUser
                        attributes: ["id", "firstName", "lastName", "email"], // Include these fields from the User model
                    },
                    {
                        model: UserModel,
                        as: "updatedByUser", // Include createdByUser
                        attributes: ["id", "firstName", "lastName", "email"], // Include these fields from the User model
                    },
                    {
                        model: UserModel,
                        as: "deletedByUser", // Include createdByUser
                        attributes: ["id", "firstName", "lastName", "email"], // Include these fields from the User model
                    },
                    {
                        model: ProductsCategoryModel,
                        as: "productCategory", // Include createdByUser
                        attributes: ["id", "name", "description", "slug", "type", "status"], // Include these fields from the User model"
                    },
                ],
            }).then((res) => {
                return {
                    rows: res.rows.map((product) => parseProduct(product.toJSON())),
                    count: res.count,
                };
            });
            const totalPages = Math.ceil(products.length / limit);
            return { data: products, total: products.length, totalPages };
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
