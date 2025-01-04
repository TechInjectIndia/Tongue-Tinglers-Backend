import {MenuProductsModel} from "../../../database/schema/menu/menu-product";

const { Op } = require("sequelize");
import {
    TMenuProduct,
    TMenuProductFilters,
} from "../../../types/menu";


import IBaseRepo from '../controllers/controller/IMenuProductMapController';

export class MenuProductMapRepo implements IBaseRepo<TMenuProduct, TMenuProductFilters> {
    constructor() { }

    public async assign(categoryId: number, productId: number): Promise<[affectedCount: number]> {
        const response = await MenuProductsModel.update({ categoryId: categoryId }, {
            where: {
                id: productId,
            },
        });
        return response;
    }

    public async unassign(productId: number): Promise<[affectedCount: number]> {
        const response = await MenuProductsModel.update({ categoryId: 0 }, {
            where: {
                id: productId,
            },
        });
        return response;
    }
}
