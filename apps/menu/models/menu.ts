const { Op } = require("sequelize");
import {
    TMenu,
    TMenuFilters,
    TMenusList,
    TAddMenu,
} from "../../../types/menu";
import { MenuModel } from "../../../database/schema";

export class MenuRepo {
    constructor() { }

    public async getMenuByAttr(whereName: any, whereVal: any, getAttributes: any = ['*']): Promise<TMenu | any> {
        const whereAttributes = { [whereName]: whereVal }
        const data = await MenuModel.findOne({
            raw: true,
            attributes: getAttributes,
            where: whereAttributes
        });
        return data;
    }

    public async list(filters: TMenuFilters): Promise<TMenusList | any> {
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

    public async add(data: TAddMenu): Promise<TMenu | any> {
        const response = await MenuModel.create(data);
        return response;
    }

    public async update(id: number, data: TAddMenu): Promise<TMenu | any> {
        const response = await MenuModel.update(data, {
            where: {
                id,
            },
        });
        return response;
    }

    public async delete(ids: number[]): Promise<TMenu | any> {
        const response = await MenuModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
