import { Op } from "sequelize";
import { TListFilters } from "../../../types"; // Adjust imports according to your types
 // Adjust the import path based on your project structure
import IBaseRepo from '../controllers/controller/pdiController';
import { IPdiList, TIPdiListList, TIPdiListPayload, TListFiltersIPdiList } from "apps/pdi-checklist/interface/Pdi";
import { PdiModel } from "./PdiTable";

export class PdiChecklistRepo implements IBaseRepo<IPdiList, TListFiltersIPdiList> {
    constructor() { }

    // Find a PDI Checklist by primary key
    public async findByPk(id: number): Promise<IPdiList | null> {
        const data = await PdiModel.findByPk(id); // Assuming your model is called PdiChecklistModel
        return data as IPdiList | null;
    }

    // Create a new PDI Checklist
    public async create(data: TIPdiListPayload): Promise<IPdiList> {
        const response = await PdiModel.create(data);
        return response as IPdiList;
    }

    // Get PDI Checklist by ID
    public async get(id: number): Promise<IPdiList | null> {
        const data = await PdiModel.findOne({
            where: { id }
        });
        return data as IPdiList | null;
    }

    // List PDI Checklists with filters
    public async list(filters: TListFiltersIPdiList): Promise<TIPdiListList> {
        const total = await PdiModel.count({
            // where: {
            //     title: {
            //         [Op.like]: `%${filters.search}%`,
            //     },
            // },
        });

        const data = await PdiModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            // where: {
            //     title: {
            //         [Op.like]: `%${filters.search}%`,
            //     },
            // },
        });

        return { total, data } as TIPdiListList;
    }

    // Update PDI Checklist information
    public async update(id: number, data: TIPdiListPayload): Promise<[number, IPdiList[]]> {
        const [affectedCount] = await PdiModel.update(data, {
            where: { id },
        });

        // Return the affected count along with the updated instances
        const updatedChecklist = await PdiModel.findAll({ where: { id } });
        return [affectedCount, updatedChecklist];
    }

    // Delete PDI Checklists by an array of IDs
    public async delete(ids: number[]): Promise<number> {
        const deletedCount = await PdiModel.destroy({
            where: {
                id: ids,
            },
        });
        return deletedCount;
    }

    public async getPdiByProspectId(prospectId: number): Promise<IPdiList[]> {
        const data = await PdiModel.findAll({
            where: { prospectId }
        });
        return data as IPdiList[] | null;
    }
}

export default PdiChecklistRepo;
