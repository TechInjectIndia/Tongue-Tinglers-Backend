import { Op } from "sequelize";
import {
    TListFilters,
} from "../../../types";
import {
    TRegionList,
    TPayloadRegion,
    IRegion,
} from "../../../interfaces";
import { RegionModel } from "../../../database/schema";
import IBaseRepo from '../controllers/controller/IRegionController';

export class RegionRepo implements IBaseRepo<IRegion, TListFilters> {
    constructor() { }

    public async get(id: number): Promise<IRegion | null> {
        const data = await RegionModel.findOne({
            where: {
                id,
            },
        });
        return data;
    }

    public async list(filters: TListFilters): Promise<TRegionList> {
        const total = await RegionModel.count({
            where: {
                title: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await RegionModel.findAll({
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

    public async create(data: TPayloadRegion): Promise<IRegion> {
        const response = await RegionModel.create(data);
        return response;
    }

    public async update(id: number, data: TPayloadRegion): Promise<[affectedCount: number]> {
        return await RegionModel.update(data, {
            where: {
                id,
            },
        });
    }

    public async delete(ids: number[]): Promise<number> {
        const response = await RegionModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
