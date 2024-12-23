import {
  BaseProduct,
  CHANGE_STATUS,
  Pagination,
  Product,
  PRODUCT_STATUS,
  PRODUCTS_TYPE,
} from "../../../interfaces/products";
import { IProductRepo } from "./IProductRepo";
import { ProductModel } from "../../../database/schema/product/productModel";
import { Op } from "sequelize";
import { ProductOptionsModel } from "../../../database/schema/product-options/productOptionsModel";
import { ParsedProduct } from "../../../interfaces/products"
import { ProductCategoryModel, UserModel } from "../../../database/schema";
import {parseProduct} from "../parser/productParser"
import { OptionsModel } from "../../../database/schema/options/optionModel";
import { OptionsValueModel } from "../../../database/schema/optionsValue/optionsValueModel";
import { ProductsCategoryModel } from "../../../database/schema/product-category/productCategoryModel";

export class ProductRepo implements IProductRepo {
  async create(product: BaseProduct): Promise<Product | null> {
    const transaction = await ProductModel.sequelize.transaction();

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
          vendorId: product.vendorId,// Initialize with an empty array
          tax_rate_id: product.tax_rate_id,
          createdBy: product.createdBy
        },
        { transaction }
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
        const createdOptions = await ProductOptionsModel.bulkCreate(productOptions, {
          transaction,
          returning: true, // Ensure the created options are returned
        });

        variationIds = createdOptions.map((option) => option.id);

        // Update the product with the created option IDs
      }

      await createdProduct.addVariations(variationIds);

      // Commit the transaction
      await transaction.commit();

      // Return the created product
      return createdProduct.toJSON();
    } catch (error) {
      console.error("Error creating product:", error);

      // Rollback the transaction in case of error
      await transaction.rollback();

      return null;
    }
  }

  async update(product: Product): Promise<Product> {
    try {
      // Find the product by its primary key (ID)
      const existingProduct = await ProductModel.findByPk(product.id, {
        include: [{ model: ProductOptionsModel, as: "productOptions" }],
      });
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

      const { rows: products, count: total } =
        await ProductModel.findAndCountAll({
          where: query,
          offset,
          limit,
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: ProductOptionsModel, // Include the ProductOptions model
              as: "variations", // Alias used in the ProductModel association
              attributes: [
                "id",
                "optionValueId",
                "price",
                "stock",
                "status",
                "images",
              ], // Only fetch these fields
              include: [
                {
                  model: OptionsValueModel,
                  as: "optionsValue", // Include these fields from the User model
                  attributes: ["id", "name", "option_id"],
                  include:[
                    {
                      model: OptionsModel,
                      as: 'options',
                      attributes:['id', 'name']
                    }
                  ]
                }
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
            }
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
      const product = await ProductModel.findByPk(id,{
        include: [
          {
            model: ProductOptionsModel, // Include the ProductOptions model
            as: "variations", // Alias used in the ProductModel association
            attributes: [
              "id",
              "optionValueId",
              "price",
              "stock",
              "status",
              "images",
            ], // Only fetch these fields
            include: [
              {
                model: OptionsValueModel,
                as: "optionsValue", // Include these fields from the User model
                attributes: ["id", "name", "option_id"],
                include:[
                  {
                    model: OptionsModel,
                    as: 'options',
                    attributes:['id', 'name']
                  }
                ]
              }
            ],
          },{
            model: UserModel,
            as: "createdByUser", // Include createdByUser
            attributes: ["id", "firstName", "lastName", "email"], // Include these fields from the User model
          },{
            model: UserModel,
            as: "updatedByUser", // Include createdByUser
            attributes: ["id", "firstName", "lastName", "email"], // Include these fields from the User model
          },{
            model: UserModel,
            as: "deletedByUser", // Include createdByUser
            attributes: ["id", "firstName", "lastName", "email"], // Include these fields from the User model
          },
          {
            model: ProductsCategoryModel,
            as: "productCategory", // Include createdByUser
            attributes: ["id", "name", "description", "slug", "type", "status"], // Include these fields from the User model"
          }
        ]

      }).then((productData)=> {
        return productData ? parseProduct(productData.toJSON()): null
      })

      return product;

      // return product.toJSON();
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
      const { id, status } = payload;

      // Check if the status is one of the allowed ENUM values
      const validStatuses = ["active", "inactive"];
      if (!validStatuses.includes(status)) {
        throw new Error(
          `Invalid status value. Status must be one of: ${validStatuses.join(
            ", "
          )}`
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
