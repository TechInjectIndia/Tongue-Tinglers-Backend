import { Op } from "sequelize";
import { TListFilters } from "../../../types"; // Adjust imports according to your types
import { ICheckPoint,TPdiCheckpointPayload,TPdiCheckpointList, TListFiltersCheckpoint } from "../../../interfaces/pdiCheckPoint"; // Adjust imports according to your types
import { PdiCheckpointModel } from "../../../database/schema/franchise/pdiCheckPointModel"; // Adjust the import path based on your project structure
import IBaseRepo from '../controllers/controller/IPdiCheckpointController';

export class PdiCheckpointRepo implements IBaseRepo<ICheckPoint, TListFiltersCheckpoint> {
    constructor() { }

    // Find a PDI Checklist by primary key
    public async findByPk(id: number): Promise<ICheckPoint | null> {
        const data = await PdiCheckpointModel.findByPk(id); // Assuming your model is called PdiChecklistModel
        return data as ICheckPoint | null;
    }

    // Create a new PDI Checklist
    public async create(data: TPdiCheckpointPayload): Promise<ICheckPoint> {
        const response = await PdiCheckpointModel.create(data);
        return response as ICheckPoint;
    }

    // Get PDI Checklist by ID
    public async get(id: number): Promise<ICheckPoint | null> {
        const data = await PdiCheckpointModel.findOne({
            where: { id }
        });
        return data as ICheckPoint | null;
    }

    // List PDI Checklists with filters
    public async list(filters: TListFiltersCheckpoint): Promise<TPdiCheckpointList> {
        const total = await PdiCheckpointModel.count({
            where: {
                title: {
                    [Op.iLike]: `%${filters.search}%`,
                },
            },
        });

        const data = await PdiCheckpointModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                title: {
                    [Op.iLike]: `%${filters.search}%`,
                },
            },
        });

        return { total, data } as TPdiCheckpointList;
    }

    // Update PDI Checklist information
    public async update(id: number, data: TPdiCheckpointPayload): Promise<[number, ICheckPoint[]]> {
        const [affectedCount] = await PdiCheckpointModel.update(data, {
            where: { id },
        });

        // Return the affected count along with the updated instances
        const updatedChecklist = await PdiCheckpointModel.findAll({ where: { id } });
        return [affectedCount, updatedChecklist];
    }

    // Delete PDI Checklists by an array of IDs
    public async delete(ids: number[]): Promise<number> {
        const deletedCount = await PdiCheckpointModel.destroy({
            where: {
                id: ids,
            },
        });
        return deletedCount;
    }
}

export default PdiCheckpointRepo;
