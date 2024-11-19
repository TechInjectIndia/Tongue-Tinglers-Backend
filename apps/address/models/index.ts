const { Op } = require("sequelize");
import {
    TAddress,
    TAddresssList,
    TPayloadAddress,
    TListFilters,
    TPayloadAddressUser,
} from "../../../types/";
import { AddressModel } from "../../../database/schema";
import IBaseRepo from '../controllers/controller/IController';

export class AddressRepo implements IBaseRepo<TAddress, TListFilters> {
    constructor() { }

    public async get(id: number, user_id: string): Promise<TAddress> {
        const data = await AddressModel.findOne({
            where: {
                id,
                user_id: user_id
            },
        });
        return data;
    }

    public async list(user_id: string, filters: TListFilters): Promise<TAddresssList> {
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

    public async create(data: TPayloadAddress): Promise<TAddress> {
        const response = await AddressModel.create(data);
        return response;
    }
   
    public async createForUser(data: TPayloadAddressUser): Promise<TAddress> {
        const response = await AddressModel.create(data);
        return response;
    }

    public async update(user_id: string, id: number, data: TPayloadAddress): Promise<[affectedCount: number]> {
        return await AddressModel.update(data, {
            where: {
                id: id,
                user_id: user_id
            },
        });
    }

    public async delete(user_id: string, ids: number[]): Promise<number> {
        const response = await AddressModel.destroy({
            where: {
                id: ids,
                user_id: user_id
            },
        });
        return response;
    }
}
