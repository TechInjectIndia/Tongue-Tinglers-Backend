import { BaseProductOptions, Pagination, ProductOptions } from "../../../interfaces/product-options";
import { IProductOptionsRepo } from "./IProductOptionsRepo";
// import {ProductOptionsModel} from "../../../database/schema/product-options/productOptionsModel";
import { ParsedProductOptions, parsedProductOptions } from "apps/product/interface/ProductOptions";
import { OptionsValueModel } from "apps/optionsValue/models/OptionValueTable";
import { ProductOptionsModel } from "../models/productOptionTable";

export class ProductOptionRepo implements IProductOptionsRepo{
    async create(productOptions: BaseProductOptions): Promise<ProductOptions | null> {
        try {
            return (await ProductOptionsModel.create({
                product_id: productOptions.product_id,
                optionValueId: productOptions.optionValueId,
                price: productOptions.price,
                stock: productOptions.stock,
                images: productOptions.images,
                status: productOptions.status,
                createdBy: productOptions.createdBy,
                updatedBy: productOptions.updatedBy,
                deletedBy: productOptions.deletedBy,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null
            })).toJSON();
        } catch (error) {
            console.log(error);
            return null;  
        }
    }
    async update(productOptions: ProductOptions): Promise<ProductOptions> {
        try {
            // Find the product by its primary key (ID)
            const existingProductOption = await ProductOptionsModel.findByPk(productOptions.id)
            if (!existingProductOption) {
                throw new Error(`Product with ID ${productOptions.id} not found`);
            }
            await existingProductOption.set(productOptions);
            await existingProductOption.save();
            return existingProductOption.toJSON();
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    delete(id: number): Promise<ProductOptions> {
        throw new Error("Method not implemented.");
    }
    async getById(id: number): Promise<ParsedProductOptions> {
        try {
            // Fetch product by primary key (ID)
           const productOptions = (await ProductOptionsModel.findOne({
            where:{
                id: id
            },
            include:[{
                model: OptionsValueModel,
                as: "optionsValue"
            }]
           })).toJSON();

           if (!productOptions) {
               throw new Error(`Product with ID ${id} not found`);
           }

           return parsedProductOptions(productOptions);
       } catch (error) {
           console.log(error);
           return null;
       }
    }
    getAll(page: number, limit: number, search: string, filters: object): Promise<Pagination<ProductOptions>> {
        throw new Error("Method not implemented.");
    }
    
    async updatePrice(payload): Promise<ProductOptions> {
        try {
            // Find the product option by its ID
            const {id, price, updatedBy} = payload
            console.log(price);
            const productOption = await ProductOptionsModel.findByPk(id);

            if (!productOption) {
                throw new Error(`ProductOption with ID ${id} not found.`);
            }

            // Update the price
            await productOption.update({ price, updatedBy });

            return productOption.toJSON();
        } catch (error) {
            console.log(error);
            return null; 
        }
    }

    async updateStock(payload): Promise<ProductOptions> {
        try {
            // Find the product option by its ID
            const {id, stock, updatedBy} = payload
            console.log(stock);
            const productOption = await ProductOptionsModel.findByPk(id);

            if (!productOption) {
                throw new Error(`ProductOption with ID ${id} not found.`);
            }

            // Update the price
            await productOption.update({ stock, updatedBy });

            return productOption.toJSON();
        } catch (error) {
            console.log(error);
            return null; 
        }
    }

    async updateStatus(payload): Promise<ProductOptions> {
        try {
            // Find the product option by its ID
            const {id, status, updatedBy} = payload

            const validStatuses = ['active', 'inactive'];
            if (!validStatuses.includes(status)) {
                throw new Error(
                    `Invalid status value. Status must be one of: ${validStatuses.join(', ')}`
                );
            }

            const productOption = await ProductOptionsModel.findByPk(id);

            if (!productOption) {
                throw new Error(`ProductOption with ID ${id} not found.`);
            }

            // Update the price
            await productOption.update({ status, updatedBy });

            return productOption.toJSON();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getByProductId(id: number): Promise<ProductOptions[]> {
        try {
            const productOptions = await ProductOptionsModel.findAll({
                where: {
                    product_id: id,
                },
            });
            return productOptions.map((productOption) => productOption.toJSON());
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}