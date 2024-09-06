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

    public async get(id: number, user_id: number): Promise<TAddress> {
        const data = await AddressModel.findOne({
            where: {
                id,
                user_id: user_id
            },
        });
        return data;
    }

    public async list(user_id: number, filters: TListFilters): Promise<TAddresssList> {
        const total = await AddressModel.count({
            where: {
                street: {
                    [Op.like]: `%${filters.search}%`,
                },
                user_id: user_id
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
                user_id: user_id
            },
        });
        return { total, data };
    }

    public async create(data: TAddAddress): Promise<TAddress> {
        const response = await AddressModel.create(data);
        return response;
    }

    public async update(user_id: number, id: number, data: TEditAddress): Promise<[affectedCount: number]> {
        return await AddressModel.update(data, {
            where: {
                id: id,
                user_id: user_id
            },
        });
    }

    public async delete(user_id: number, ids: number[]): Promise<number> {
        const response = await AddressModel.destroy({
            where: {
                id: ids,
                user_id: user_id
            },
        });
        return response;
    }
}
