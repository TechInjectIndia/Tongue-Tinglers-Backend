import { Op } from "sequelize";
import { TListFilters } from "../../../types"; // Adjust imports according to your types
 // Adjust the import path based on your project structure
import IBaseRepo from '../controllers/controller/IPdiChecklistController';
import { IPdiChecklist, TPdiChecklistList, TPdiChecklistPayload } from "../interface/PdiCheckList";
import { PdiChecklistModel } from "./PdiCheckListTable";

export class PdiChecklistRepo implements IBaseRepo<IPdiChecklist, TListFilters> {
    constructor() { }

    // Find a PDI Checklist by primary key
    public async findByPk(id: number): Promise<IPdiChecklist | null> {
        const data = await PdiChecklistModel.findByPk(id); // Assuming your model is called PdiChecklistModel
        return data as IPdiChecklist | null;
    }

    // Create a new PDI Checklist
    public async create(data: TPdiChecklistPayload): Promise<IPdiChecklist> {
        const response = await PdiChecklistModel.create(data);
        return response as IPdiChecklist;
    }

    // Get PDI Checklist by ID
    public async get(id: number): Promise<IPdiChecklist | null> {
        const data = await PdiChecklistModel.findOne({
            where: { id }
        });
        return data as IPdiChecklist | null;
    }

    // List PDI Checklists with filters
    public async list(filters: TListFilters): Promise<TPdiChecklistList> {
        const total = await PdiChecklistModel.count({
            where: {
                checklistName: {
                    [Op.iLike]: `%${filters.search}%`,
                },
            },
        });

        const data = await PdiChecklistModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                checklistName: {
                    [Op.iLike]: `%${filters.search}%`,
                },
            },
        });

        return { total, data } as TPdiChecklistList;
    }

    // Update PDI Checklist information
    public async update(id: number, data: TPdiChecklistPayload): Promise<[number, IPdiChecklist[]]> {
        const [affectedCount] = await PdiChecklistModel.update(data, {
            where: { id },
        });

        // Return the affected count along with the updated instances
        const updatedChecklist = await PdiChecklistModel.findAll({ where: { id } });
        return [affectedCount, updatedChecklist];
    }

    // Delete PDI Checklists by an array of IDs
    public async delete(ids: number[]): Promise<number> {
        const deletedCount = await PdiChecklistModel.destroy({
            where: {
                id: ids,
            },
        });
        return deletedCount;
    }
}

export default PdiChecklistRepo;
