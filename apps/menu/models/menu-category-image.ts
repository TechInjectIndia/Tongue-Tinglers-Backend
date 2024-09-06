const { Op } = require("sequelize");
import {
    TMenuCategory,
    TAddMenuCategory,
    TMenuCategorysList,
    TEditMenuCategory,
    TMenuCategoryFilters,
} from "../../../types/menu/menu-category";
import { MenuCategoryModel } from "../../../database/schema";

import IBaseRepo from '../controllers/controller/IMenuCategoryImageController';

export class MenuCategoryImageRepo implements IBaseRepo<TMenuCategory, TMenuCategoryFilters> {
    constructor() { }

    public async get(id: number): Promise<TMenuCategory | null> {
        const data = await MenuCategoryModel.findOne({
            where: {
                id,
            },
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
