const { Op } = require("sequelize");
import {
    TMenuProduct,
    TMenuProductsList,
    TPayloadMenuProduct,
    TMenuProductFilters,
} from "../../../types/menu/menu-product";
import { MenuProductsModel } from "../../../database/schema";

import IBaseRepo from '../controllers/controller/IMenuProductController';

export class MenuProductRepo implements IBaseRepo<TMenuProduct, TMenuProductFilters> {
    constructor() { }

    public async list(filters: TMenuProductFilters): Promise<TMenuProductsList> {
        const total = await MenuProductsModel.count({
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await MenuProductsModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        return { total, data };
    }

    public async get(id: number): Promise<TMenuProduct | null> {
        const data = await MenuProductsModel.findOne({
            where: {
                id,
            },
        });
        return data;
    }

    public async getMenuProductByAttr(whereName: string, whereVal: any, getAttributes: any = ['*']): Promise<TMenuProduct | null> {
        const whereAttributes = { [whereName]: whereVal }
        const data = await MenuProductsModel.findOne({
            raw: true,
            attributes: getAttributes,
            where: whereAttributes
        });
        return data;
    }

    public async create(data: TPayloadMenuProduct): Promise<TMenuProduct> {
        const response = await MenuProductsModel.create(data);
        return response;
    }

    public async update(id: number, data: TPayloadMenuProduct): Promise<[affectedCount: number]> {
        const response = await MenuProductsModel.update(data, {
            where: {
                id,
            },
        });
        return response;
    }

    public async delete(ids: number[]): Promise<number> {
        const response = await MenuProductsModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
