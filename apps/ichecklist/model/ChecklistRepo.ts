import { Op } from "sequelize";
import { ICheckList, TICheckListList, TICheckListPayload, TListFiltersICheckListt } from "../../../interfaces/ichecklist"; // Adjust imports according to your types
import { IChecklistModel } from "../../../database/schema/franchise/iChecklist"; // Adjust the import path based on your project structure
import IBaseRepo from '../controllers/controller/IiChecklist';
import { UserModel } from "../../../database/schema";
import { getUserName } from "../../common/utils/commonUtils";

export class PdiChecklistRepo {
    constructor() { }

    // Find a PDI Checklist by primary key
    public async findByPk(id: number): Promise<ICheckList | null> {
        const data = await IChecklistModel.findByPk(id); // Assuming your model is called PdiChecklistModel
        return data as ICheckList | null;
    }

    // Create a new PDI Checklist
    public async create(data: TICheckListPayload, userId: number): Promise<ICheckList> {
        const user = await UserModel.findByPk(userId);
        if (!user) {
            throw new Error(`User with ID ${userId} not found.`);
        }

        const response = await IChecklistModel.create(data, {
            userId: user.id,
            userName: getUserName(user),
        });

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
                    [Op.iLike]: `%${filters.search}%`,
                },
            },
        });

        const data = await IChecklistModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                title: {
                    [Op.iLike]: `%${filters.search}%`,
                },
            },
        });

        return { total, data } as TICheckListList;
    }

    // Update PDI Checklist information
    public async update(id: number, data: TICheckListPayload, userId: number): Promise<[number, ICheckList[]]> {
        const checklist = await IChecklistModel.findByPk(id);
        const user = await UserModel.findByPk(userId);
        if (!checklist) {
            throw new Error("Checklist not found");
        }
        if(!user){
            throw new Error(`User with ID ${userId} not found.`);
        }
        checklist.set(data);
        await checklist.save({
            userId: user.id,
            userName: user.firstName,
        });
        
        // Return the affected count along with the updated instances
        const updatedChecklist = await IChecklistModel.findAll({ where: { id } });
        return [1, updatedChecklist];
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

    public async getChecklistByFranchiseId(franchiseModelId: number): Promise<ICheckList[]> {
        const data = await IChecklistModel.findAll({
            where: { franchiseModelId }
        });
        return data as ICheckList[] | null;
    }
}

export default PdiChecklistRepo;
