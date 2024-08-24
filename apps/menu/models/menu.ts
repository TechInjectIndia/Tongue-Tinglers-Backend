const { Op } = require("sequelize");
import {
    TMenu,
    TMenuFilters,
    TMenusList,
    TAddMenu,
} from "../../../types/menu";
import { Menu } from "../../../database/schema";

export class MenuModel {
    constructor() { }

    public async getMenuByAttr(whereName: any, whereVal: any, getAttributes: any = '*'): Promise<TMenu | any> {
        const whereAttributes = { [whereName]: whereVal }
        const data = await Menu.findOne({
            raw: true,
            attributes: getAttributes,
            where: whereAttributes
        });
        return data;
    }

    public async list(filters: TMenuFilters): Promise<TMenusList | any> {
        const total = await Menu.count({
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await Menu.findAll({
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

    public async add(data: TAddMenu): Promise<TMenu | any> {
        const response = await Menu.create(data);
        return response;
    }

    public async update(id: number, data: TAddMenu): Promise<TMenu | any> {
        const response = await Menu.update(data, {
            where: {
                id,
            },
        });
        return response;
    }

    public async delete(ids: number[]): Promise<TMenu | any> {
        const response = await Menu.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
