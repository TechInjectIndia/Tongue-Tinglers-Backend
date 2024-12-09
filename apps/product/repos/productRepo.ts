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
export class ProductRepo implements IProductRepo {
  async create(product: BaseProduct): Promise<Product | null> {
    const transaction = await ProductModel.sequelize.transaction();
    try {
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
          variations: product.variations,
        },
        { transaction } // Pass the transaction
      );

      let productOptionsIds: number[] = []; // Array to store option IDs

      if (product.variations && Array.isArray(product.variations)) {
        const productOptions = product.variations.map((option) => ({
          product_id: createdProduct.id, // Link the option to the created product
          option_value_id: option.option_value_id,
          price: option.price,
          stock: option.stock,
          status: option.status,
          images: option.images,
        }));

        // Bulk create the product options
        const createdOptions = await ProductOptionsModel.bulkCreate(
          productOptions,
          {
            transaction,
            returning: true, // Returns the created rows
          }
        );

        productOptionsIds = createdOptions.map((option) => option.id);
      }

      await createdProduct.update(
        {
          productOptionsIds,
        },
        { transaction }
      );

      await transaction.commit();
      return createdProduct.toJSON();
    } catch (error) {
      console.log(error);
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
  ): Promise<Pagination<Product>> {
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
              as: "options", // Alias used in the ProductModel association
              attributes: [
                "id",
                "option_value_id",
                "price",
                "stock",
                "status",
                "images",
              ], // Only fetch these fields
            },
          ],
        }).then((res) => {
          return {
            rows: res.rows.map((product) => product.toJSON()),
            count: res.count,
          };
        });

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
