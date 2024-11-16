import { Op } from "sequelize";
import {
    TListFilters,
} from "../../../types";
import {
    TAreaList,
    TPayloadArea,
    IArea,
} from "../../../interfaces";
import { AreaModel } from "../../../database/schema";
import IBaseRepo from '../controllers/controller/IAreaController';

export class AreaRepo implements IBaseRepo<IArea, TListFilters> {
    constructor() { }

    public async get(id: number): Promise<IArea | null> {
        const data = await AreaModel.findOne({
            where: {
                id,
            },
        });
        return data;
    }

    public async list(filters: TListFilters): Promise<TAreaList> {
        const total = await AreaModel.count({
            where: {
                title: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await AreaModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                title: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        return { total, data };
    }

    public async create(data: TPayloadArea): Promise<IArea> {
        const response = await AreaModel.create(data);
        return response;
    }

    public async update(id: number, data: TPayloadArea): Promise<[affectedCount: number]> {
        return await AreaModel.update(data, {
            where: {
                id,
            },
        });
    }

    public async delete(ids: number[]): Promise<number> {
        const response = await AreaModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
