const { Op } = require("sequelize");
import {
    TRetortProductCategoryLink,
    TRetortProductFilters,
    TAddRetortProductCategoryLink,
} from "../../../types";
import { RetortProductCategoryMapModel } from "../../../database/schema";

import IBaseRepo from '../controllers/controller/IProductCategoryMapController';

export class RetortProductCategoryMapRepo implements IBaseRepo<TRetortProductCategoryLink, TRetortProductFilters> {
    constructor() { }

    public async assign(data: TAddRetortProductCategoryLink): Promise<TRetortProductCategoryLink> {
        const response = await RetortProductCategoryMapModel.create(data);
        return response;
    }

    public async get(ProductId: number, categoryId: number): Promise<TRetortProductCategoryLink> {
        const response = await RetortProductCategoryMapModel.findOne({
            where: {
                productId: ProductId,
                categoryId: categoryId,
            },
        });
        return response;
    }

    public async unassign(ProductId: number, categoryId: number): Promise<number> {
        const response = await RetortProductCategoryMapModel.destroy({
            where: {
                productId: ProductId,
                categoryId: categoryId,
            },
        });
        return response;
    }
}
