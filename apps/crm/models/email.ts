const { Op } = require("sequelize");
import {
    TEmail,
    TQueryFilters,
    TEmailsList,
    TAddEmail,
    TEditEmail,
} from "../../../types";
import { EmailModel } from "../../../database/schema";
import IBaseRepo from '../controllers/controller/IEmailController';

export class EmailRepo implements IBaseRepo<TEmail, TQueryFilters> {
    constructor() { }

    public async get(id: number): Promise<TEmail | null> {
        const data = await EmailModel.findOne({
            where: {
                id,
            },
        });
        return data;
    }

    public async list(filters: TQueryFilters): Promise<TEmailsList> {
        const total = await EmailModel.count({
            where: {
                status: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await EmailModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                status: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        return { total, data };
    }

    public async create(data: TAddEmail): Promise<TEmail> {
        const response = await EmailModel.create(data);
        return response;
    }

    public async update(id: number, data: TEditEmail): Promise<[affectedCount: number]> {
        const response = await EmailModel.update(data, {
            where: {
                id,
            },
        });
        return response;
    }

    public async delete(ids: number[]): Promise<number> {
        const response = await EmailModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
