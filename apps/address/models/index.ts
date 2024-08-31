const { Op } = require("sequelize");
import {
    TAddress,
    TAddressFilters,
    TAddresssList,
    TAddAddress,
} from "../../../types/";
import { Address } from "../../../database/schema";

export class AddressModel {
    constructor() { }

    public async getAddressByAttr(whereName: any, whereVal: any, getAttributes: any = '*'): Promise<TAddress | any> {
        const whereAttributes = { [whereName]: whereVal }
        const data = await Address.findOne({
            raw: true,
            attributes: getAttributes,
            where: whereAttributes
        });
        return data;
    }

    public async list(filters: TAddressFilters): Promise<TAddresssList | any> {
        const total = await Address.count({
            where: {
                street: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await Address.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                street: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        return { total, data };
    }

    public async add(data: TAddAddress): Promise<TAddress | any> {
        const response = await Address.create(data);
        return response;
    }

    public async update(id: number, data: TAddAddress): Promise<TAddress | any> {
        const response = await Address.update(data, {
            where: {
                id,
            },
        });
        return response;
    }

    public async delete(ids: number[]): Promise<TAddress | any> {
        const response = await Address.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
