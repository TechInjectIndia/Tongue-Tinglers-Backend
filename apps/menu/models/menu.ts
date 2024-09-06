const { Op } = require("sequelize");
import {
    TMenu,
    TMenuFilters,
    TMenusList,
    TAddMenu,
} from "../../../types/menu";
import { MenuModel } from "../../../database/schema";

import IBaseRepo from '../controllers/controller/IMenuController';

export class MenuRepo implements IBaseRepo<TMenu, TMenuFilters> {
    constructor() { }

    public async get(id: number): Promise<TMenu> {
        const data = await MenuModel.findOne({
            where: {
                id,
            },
        });
        return data;
    }

    public async getMenuByAttr(whereName: any, whereVal: any, getAttributes: any = ['*']): Promise<TMenu> {
        const whereAttributes = { [whereName]: whereVal }
        const data = await MenuModel.findOne({
            raw: true,
            attributes: getAttributes,
            where: whereAttributes
        });
        return data;
    }

    public async list(filters: TMenuFilters): Promise<TMenusList> {
        const total = await MenuModel.count({
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await MenuModel.findAll({
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
