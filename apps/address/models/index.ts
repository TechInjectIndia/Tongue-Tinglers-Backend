const { Op } = require("sequelize");
import {
    TAddress,
    TAddresssList,
    TAddAddress,
    TListFilters,
    TEditAddress
} from "../../../types/";
import { AddressModel } from "../../../database/schema";
import IBaseRepo from '../controllers/controller/IController';

export class AddressRepo implements IBaseRepo<TAddress, TListFilters> {
    constructor() { }

    public async get(id: number): Promise<TAddress> {
        const data = await AddressModel.findOne({
            where: {
                id,
            },
        });
        return data;
    }

    public async getAddressByAttr(whereName: any, whereVal: any, getAttributes: any = ['*']): Promise<TAddress> {
        const whereAttributes = { [whereName]: whereVal }
        const data = await AddressModel.findOne({
            raw: true,
            attributes: getAttributes,
            where: whereAttributes
        });
        return data;
    }

    public async list(filters: TListFilters): Promise<TAddresssList> {
        const total = await AddressModel.count({
            where: {
                street: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await AddressModel.findAll({
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

    public async create(data: TAddAddress): Promise<TAddress> {
        const response = await AddressModel.create(data);
        return response;
    }

    public async update(id: number, data: TEditAddress): Promise<[affectedCount: number]> {
        return await AddressModel.update(data, {
            where: {
                id,
            },
        });
    }

    public async delete(ids: number[]): Promise<number> {
        const response = await AddressModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
