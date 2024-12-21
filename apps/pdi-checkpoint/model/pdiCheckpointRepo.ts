import { Op } from "sequelize";
import { TListFilters } from "../../../types"; // Adjust imports according to your types
import { ICheckPoint, TPdiCheckpointPayload, TPdiCheckpointList, TListFiltersCheckpoint } from "../../../interfaces/pdiCheckPoint"; // Adjust imports according to your types
import { PdiCheckpointModel } from "../../../database/schema/franchise/pdiCheckPointModel"; // Adjust the import path based on your project structure
import IBaseRepo from '../controllers/controller/IPdiCheckpointController';
import { UserModel } from "../../../database/schema";
import { getUserName } from "../../common/utils/commonUtils";

export class PdiCheckpointRepo {
    constructor() { }

    // Find a PDI Checklist by primary key
    public async findByPk(id: number): Promise<ICheckPoint | null> {
        const data = await PdiCheckpointModel.findByPk(id); // Assuming your model is called PdiChecklistModel
        return data as ICheckPoint | null;
    }

    // Create a new PDI Checklist
    public async create(data: TPdiCheckpointPayload, userId: number): Promise<ICheckPoint> {
        const user = await UserModel.findByPk(userId);
        if(!user){
            throw new Error(`User with ID ${userId} not found.`);
        }

        const response = await PdiCheckpointModel.create(data, {
            userId: user.id,
            userName: getUserName(user),
        });
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
    public async update(id: number, data: TPdiCheckpointPayload, userId: number): Promise<[number, ICheckPoint[]]> {
        const user = await UserModel.findByPk(userId);
        if(!user){
            throw new Error(`User with ID ${userId} not found.`);
        }
        const checkpoint = await PdiCheckpointModel.findByPk(id);
        if (!checkpoint) {
            throw new Error("Checkpoint not found");
        }
        checkpoint.set(data);
        checkpoint.save({
            userId: user.id,
            userName: getUserName(user),
        }); 
        // Return the affected count along with the updated instances
        const updatedCheckpoint = await PdiCheckpointModel.findAll({ where: { id } });
        return [1, updatedCheckpoint];
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
