import { Op } from "sequelize";
import {
    TListFilters,
} from "../../../types";
import {
    TRegionList,
    TPayloadRegion,
    IRegion,
} from "../../../interfaces";
import { Region } from "../../../database/schema";
import IBaseRepo from '../controllers/controller/IRegionController';

export class RegionRepo implements IBaseRepo<IRegion, TListFilters> {
    constructor() { }

    public async get(id: string): Promise<IRegion | null> {
        const data = await Region.findOne({
            where: {
                id,
            },
        });
        return data;
    }

    public async list(filters: TListFilters): Promise<TRegionList> {
        const total = await Region.count({
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await Region.findAll({
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

    public async create(data: TPayloadRegion): Promise<IRegion> {
        const response = await Region.create(data);
        return response;
    }

    public async update(id: string, data: TPayloadRegion): Promise<[affectedCount: number]> {
        return await Region.update(data, {
            where: {
                id,
            },
        });
    }

    public async delete(ids: string[]): Promise<number> {
        const response = await Region.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
