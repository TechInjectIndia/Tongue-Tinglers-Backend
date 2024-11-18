import { Op } from "sequelize";
import {
    TListFiltersRegions,
} from "../../../types";
import {
    TRegionList,
    TPayloadRegion,
    IRegion,
} from "../../../interfaces";
import { RegionModel } from "../../../database/schema";
import IBaseRepo from '../controllers/controller/IRegionController';

export class RegionRepo implements IBaseRepo<IRegion, TListFiltersRegions> {
    constructor() { }

    public async get(id: string): Promise<IRegion | null> {
        const data = await RegionModel.findOne({
            where: {
                id,
            },
        });
        return data;
    }

    public async list(filters: TListFiltersRegions): Promise<TRegionList> {
        // Initialize the whereCondition object
        const whereCondition: any = {};

        // If the search term is provided, apply it to the relevant fields
        if (filters.search) {
            whereCondition[Op.or] = [
                { title: { [Op.like]: `%${filters.search}%` } },
                { createdBy: { [Op.like]: `%${filters.search}%` } },
            ];

            // Only apply the search on numeric fields (id, area) if the search term is a number
            // if (!isNaN(Number(filters.search))) {
            //     whereCondition[Op.or].push(
            //         { id: { [Op.eq]: filters.search } },
            //         {
            //             area: { [Op.contains]: [Number(filters.search)] }
            //         }
            //     )
            // }
        }

        // Add additional filters (e.g., id, region) if provided
        if (filters.filters?.id) {
            whereCondition.id = { [Op.eq]: filters.filters.id };
        }
        if (filters.filters?.title) {
            whereCondition.title = { [Op.like]: `%${filters.filters.title}%` };
        }
        // if (filters.filters?.area) {
        //     whereCondition.area = { [Op.contains]: [filters.filters.area] };
        // }
        if (filters.filters?.createdBy) {
            whereCondition.createdBy = { [Op.eq]: filters.filters.createdBy };
        }

        // Count total regions matching the search criteria
        const total = await RegionModel.count({
            where: whereCondition,
        });

        // Retrieve the regions with pagination, sorting, and the updated whereCondition
        const data = await RegionModel.findAll({
            order: [filters?.sorting], // Ensure sorting is sanitized
            offset: filters.offset,
            limit: filters.limit,
            where: whereCondition,
        });

        return { total, data };
    }

    public async create(data: TPayloadRegion): Promise<IRegion> {
        const response = await RegionModel.create(data);
        return response;
    }

    public async update(id: string, data: TPayloadRegion): Promise<[affectedCount: number]> {
        return await RegionModel.update(data, {
            where: {
                id,
            },
        });
    }

    public async delete(ids: string[]): Promise<number> {
        const response = await RegionModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
