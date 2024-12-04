const { Op } = require("sequelize");
import {
    TMenu,
    TMenuFilters,
    TMenusList,
    TAddMenu,
} from "../../../types/menu";
import { MenuModel, MenuCategoryModel, MenuProductsModel } from "../../../database/schema";

import IBaseRepo from '../controllers/controller/IMenuController';

export class MenuRepo implements IBaseRepo<TMenu, TMenuFilters> {
    constructor() { }

    public async get(id: number): Promise<TMenu> {
        const data = await MenuModel.findOne({
            where: {
                id,
            },
            include: [
                {
                    model: MenuCategoryModel,
                    as: 'categories',
                    include: [{
                        model: MenuProductsModel,
                        as: 'products',
                    }]
                },
            ],
        });
        return data;
    }

    public async getMenuByName(name: string): Promise<TMenu> {
        const data = await MenuModel.findOne({
            where: {
                name,
            },
            include: [
                {
                    model: MenuCategoryModel,
                    as: 'categories'
                },
            ],
        });
        return data;
    }

    public async list(filters: TMenuFilters): Promise<TMenusList> {
        const total = await MenuModel.count({
            where: {
                name: {
                    [Op.iLike]: `%${filters.search}%`,
                },
            },
        });
        const data = await MenuModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                name: {
                    [Op.iLike]: `%${filters.search}%`,
                },
            },
        });
        return { total, data };
    }

    public async create(data: TAddMenu): Promise<TMenu> {
        const response = await MenuModel.create(data);
        return response;
    }

    public async update(id: number, data: TAddMenu): Promise<[affectedCount: number]> {
        const response = await MenuModel.update(data, {
            where: {
                id,
            },
        });
        return response;
    }

    public async delete(ids: number[]): Promise<number> {
        const response = await MenuModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
