import {
    IAddress,
    IAddressList,
    IPayloadAddress,
    TListFilters,
} from "../../../types";
import { AddressModel } from "../../../database/schema";
import IBaseRepo from "../controllers/controller/IController";

const { Op } = require("sequelize");

export class AddressRepo implements IBaseRepo<IAddress, TListFilters> {
    constructor() {
    }

    public async get(id: number, user_id: number): Promise<IAddress> {
        return await AddressModel.findOne({
            where: {
                id,
            },
        });
    }

    public async list(user_id: number, filters: TListFilters): Promise<IAddressList> {
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

    public async create(data: IPayloadAddress): Promise<IAddress> {
        return await AddressModel.create(data);
    }


    public async update(user_id: number, id: number, data: IPayloadAddress): Promise<[affectedCount: number]> {
        return await AddressModel.update(data, {
            where: {
                id: id,

            },
        });
    }

    public async delete(user_id: number, ids: number[]): Promise<number> {
        return await AddressModel.destroy({
            where: {
                id: ids,

            },
        });
    }
}
