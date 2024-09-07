const { Op } = require("sequelize");
import {
    TProductCategoryLink,
    TProductFilters,
    TAddProductCategoryLink,
} from "../../../types";
import { ProductCategoryMapModel } from "../../../database/schema";

import IBaseRepo from '../controllers/controller/IProductCategoryMapController';

export class ProductCategoryMapRepo implements IBaseRepo<TProductCategoryLink, TProductFilters> {
    constructor() { }

    public async assign(data: TAddProductCategoryLink): Promise<TProductCategoryLink> {
        const response = await ProductCategoryMapModel.create(data);
        return response;
    }

    public async get(ProductId: number, categoryId: number): Promise<TProductCategoryLink> {
        const response = await ProductCategoryMapModel.findOne({
            where: {
                productId: ProductId,
                categoryId: categoryId,
            },
        });
        return response;
    }

    public async unassign(ProductId: number, categoryId: number): Promise<number> {
        const response = await ProductCategoryMapModel.destroy({
            where: {
                productId: ProductId,
                categoryId: categoryId,
            },
        });
        return response;
    }
}
