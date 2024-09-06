const { Op } = require("sequelize");
import {
    TMenuCategory,
    TAddMenuCategory,
    TMenuCategorysList,
    TEditMenuCategory,
    TMenuCategoryFilters,
} from "../../../types/menu/menu-category";
import { MenuCategoryModel } from "../../../database/schema";

import IBaseRepo from '../controllers/controller/IMenuCategoryController';

export class MenuCategoryRepo implements IBaseRepo<TMenuCategory, TMenuCategoryFilters> {
    constructor() { }

    public async list(filters: TMenuCategoryFilters): Promise<TMenuCategorysList> {
        const total = await MenuCategoryModel.count({
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await MenuCategoryModel.findAll({
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

    public async get(id: number): Promise<TMenuCategory | null> {
        const data = await MenuCategoryModel.findOne({
            where: {
                id,
            },
        });
        return data;
    }

    public async getMenuCategoryByAttr(whereName: string, whereVal: any, getAttributes: any = ['*']): Promise<TMenuCategory | null> {
        const whereAttributes = { [whereName]: whereVal }
        const data = await MenuCategoryModel.findOne({
            raw: true,
            attributes: getAttributes,
            where: whereAttributes
        });
        return data;
    }

    public async create(data: TAddMenuCategory): Promise<TMenuCategory> {
        const response = await MenuCategoryModel.create(data);
        return response;
    }

    public async update(id: number, data: TEditMenuCategory): Promise<[affectedCount: number]> {
        const response = await MenuCategoryModel.update(data, {
            where: {
                id,
            },
        });
        return response;
    }

    public async delete(ids: number[]): Promise<number> {
        const response = await MenuCategoryModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
