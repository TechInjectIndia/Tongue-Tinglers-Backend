import { Op } from "sequelize";
import { ICheckList, ParsedChecklist, TICheckListList, TICheckListPayload, TListFiltersICheckListt } from "../interface/IChecklist";
import { IChecklistModel } from "./CheckListTable";
import { UserModel } from "apps/user/models/UserTable";
import { getUserName } from "apps/common/utils/commonUtils";
import {
    FranchiseLeadModel
} from "../../franchise_model/models/FranchiseModelTable";
import { parseChecklist } from "../parser/checklistParser";

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
    public async get(id: number): Promise<ParsedChecklist | null> {
        const data = await IChecklistModel.findOne({
            where: { id },
            include : [
                {
                    model: UserModel,
                    as: "createdByUser",
                },
                {
                    model: UserModel,
                    as: "updatedByUser",
                },
                {
                    model: FranchiseLeadModel,
                    as: "franchiseModal",
                },
            ],
        });

        return parseChecklist(data); 
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
            include : [
                {
                    model: UserModel,
                    as: "createdByUser",
                },
                {
                    model: UserModel,
                    as: "updatedByUser",
                }, {
                    model: UserModel,
                    as: "deletedByUser",
                },
                {
                    model: FranchiseLeadModel,
                    as: "franchiseModal",
                },
            ],
        });

        const parsedData = data.map((checklist) => parseChecklist(checklist));

        return { total, data: parsedData };
    }

    // Update PDI Checklist information
    public async update(id: number, data: TICheckListPayload, userId: number): Promise<[number, ICheckList[]]> {
        const checklist = await IChecklistModel.findByPk(id);
        const user = await UserModel.findByPk(userId);
        if (!checklist) {
            throw new Error("Checklist not found");
        }
        if (!user) {
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

    public async getChecklistByFranchiseId(franchiseModelId: number): Promise<ParsedChecklist[]> {
        const data = await IChecklistModel.findAll({
            where: { franchiseModelId },
            include : [
                {
                    model: UserModel,
                    as: "createdByUser",
                },
                {
                    model: UserModel,
                    as: "updatedByUser",
                }, {
                    model: UserModel,
                    as: "deletedByUser",
                },
                {
                    model: FranchiseLeadModel,
                    as: "franchiseModal",
                },
            ],
        });

        const parsedData = data.map((checklist) => parseChecklist(checklist));
        return parsedData;
    }
}

export default PdiChecklistRepo;
