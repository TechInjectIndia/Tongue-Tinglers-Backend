import { Op } from "sequelize";
import {
    TListFiltersAreas,
} from "../../../types";
import {
    TAreaList,
    TPayloadArea,
    IArea,
} from "../../../interfaces";
import { AreaModel } from "../../../database/schema";
import IBaseRepo from '../controllers/IAreaController';

export class AreaRepo implements IBaseRepo<IArea, TListFiltersAreas> {
    constructor() { }

    public async get(id: number): Promise<IArea | null> {
        const data = await AreaModel.findOne({
            where: {
                id,
            },
        });
        return data;
    }

    public async list(filters: TListFiltersAreas): Promise<TAreaList> {
        // Initialize the whereCondition object
        const whereCondition: any = {};

        // If the search term is provided, apply it to the relevant fields
        if (filters.search) {
            whereCondition[Op.or] = [
                { id: { [Op.like]: `%${filters.search}%` } },
                { title: { [Op.iLike]: `%${filters.search}%` } },
                { createdBy: { [Op.like]: `%${filters.search}%` } },
            ];
        }

        // Add additional filters (e.g., id, region) if provided
        if (filters.filters?.id) {
            whereCondition.id = { [Op.eq]: filters.filters.id };
        }
        if (filters.filters?.title) {
            whereCondition.title = { [Op.like]: `%${filters.filters.title}%` };
        }
        if (filters.filters?.createdBy) {
            whereCondition.createdBy = { [Op.eq]: filters.filters.createdBy };
        }

        // Count total regions matching the search criteria
        const total = await AreaModel.count({
            where: whereCondition,
        });

        // Retrieve the regions with pagination, sorting, and the updated whereCondition
        const data = await AreaModel.findAll({
            order: [filters?.sorting], // Ensure sorting is sanitized
            offset: filters.offset,
            limit: filters.limit,
            where: whereCondition,
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
