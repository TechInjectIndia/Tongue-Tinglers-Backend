import { Op } from "sequelize";

import IBaseRepo from '../controllers/controller/IRegionController';
import { IRegion, TPayloadRegion, TRegionList } from "./Region";
import { TListFiltersRegions } from "apps/common/models/common";
import { RegionModel } from "./RegionTable";
import { AreaModel } from "apps/area/models/AreaTable";

export class RegionRepo implements IBaseRepo<IRegion, TListFiltersRegions> {
    constructor() { }

    public async get(id: number): Promise<IRegion | null> {
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
                { title: { [Op.iLike]: `%${filters.search}%` } },
                { createdBy: { [Op.iLike]: `%${filters.search}%` } },
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
            whereCondition.title = { [Op.iLike]: `%${filters.filters.title}%` };
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
            include:{model: AreaModel, as: "areas"}
        });

        return { total, data };
    }

    public async create(data: TPayloadRegion): Promise<IRegion> {
        const response = await RegionModel.create(data);
        if(data.area) await response.addAreas(data.area);
        return response;
    }

    public async update(id: number, data: TPayloadRegion): Promise<[affectedCount: number]> {
        const dd = await RegionModel.findOne({
            where: {
                id,
            },
        });

        await dd.removeAreas(dd.area)


        const response = await RegionModel.update(data, {
            where: {
                id,
            },
        });

        await dd.addAreas(data.area)

        return response;
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
