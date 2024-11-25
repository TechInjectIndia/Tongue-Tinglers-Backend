import { Op } from "sequelize";
import { TListFilters } from "../../../types"; // Adjust imports according to your types
import { ICheckList, TICheckListList, TICheckListPayload, TListFiltersICheckListt } from "../../../interfaces/ichecklist"; // Adjust imports according to your types
import { IChecklistModel } from "../../../database/schema/franchise/iChecklist"; // Adjust the import path based on your project structure
import IBaseRepo from '../controllers/controller/IiChecklist';

export class PdiChecklistRepo implements IBaseRepo<ICheckList, TListFiltersICheckListt> {
    constructor() { }

    // Find a PDI Checklist by primary key
    public async findByPk(id: number): Promise<ICheckList | null> {
        const data = await IChecklistModel.findByPk(id); // Assuming your model is called PdiChecklistModel
        return data as ICheckList | null;
    }

    // Create a new PDI Checklist
    public async create(data: TICheckListPayload): Promise<ICheckList> {
        const response = await IChecklistModel.create(data);
        return response as ICheckList;
    }

    // Get PDI Checklist by ID
    public async get(id: number): Promise<ICheckList | null> {
        const data = await IChecklistModel.findOne({
            where: { id }
        });
        return data as ICheckList | null;
    }

    // List PDI Checklists with filters
    public async list(filters: TListFiltersICheckListt): Promise<TICheckListList> {
        const total = await IChecklistModel.count({
            where: {
                title: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });

        const data = await IChecklistModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                title: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });

        return { total, data } as TICheckListList;
    }

    // Update PDI Checklist information
    public async update(id: number, data: TICheckListPayload): Promise<[number, ICheckList[]]> {
        const [affectedCount] = await IChecklistModel.update(data, {
            where: { id },
        });

        // Return the affected count along with the updated instances
        const updatedChecklist = await IChecklistModel.findAll({ where: { id } });
        return [affectedCount, updatedChecklist];
    }

    // Delete PDI Checklists by an array of IDs
    public async delete(ids: number[]): Promise<number> {
        const deletedCount = await IChecklistModel.destroy({
            where: {
                id: ids,
            },
        });
        return deletedCount;
    }
}

export default PdiChecklistRepo;
