const { Op } = require("sequelize");
import {
    TListFilters,
} from "../../../types";
import { Franchise } from "../../../interfaces";
import IBaseRepo from "../controllers/IFranchiseController";

export class FranchiseRepo implements IBaseRepo<Franchise, Franchise, TListFilters> {
    constructor() {
    }

    list(filters: TListFilters): Promise<Franchise[]> {
        throw new Error("Method not implemented.");
    }

    get(id: number): Promise<Franchise> {
        throw new Error("Method not implemented.");
    }

    create(payload: Franchise): Promise<Franchise> {
        throw new Error("Method not implemented.");
    }

    update(id: number, payload: Franchise): Promise<[affectedCount: number]> {
        throw new Error("Method not implemented.");
    }

    delete(ids: number[], deletedBy: number): Promise<number> {
        throw new Error("Method not implemented.");
    }

    getFranchiseByEmail(email: string): Promise<Franchise> {
        throw new Error("Method not implemented.");
    }

    deletedList(filters: TListFilters): Promise<Franchise[]> {
        throw new Error("Method not implemented.");
    }

    // public async list(filters: TListFilters): Promise<any> {
    //     const total = await UserModel.count({
    //         where: {
    //             email: {
    //                 [Op.like]: `%${filters.search}%`,
    //             },
    //             type: USER_TYPE.FRANCHISE,
    //         },
    //     });
    //     const data = await UserModel.findAll({
    //         order: [filters?.sorting],
    //         offset: filters.offset,
    //         limit: filters.limit,
    //         where: {
    //             email: {
    //                 [Op.like]: `%${filters.search}%`,
    //             },
    //             type: USER_TYPE.FRANCHISE,
    //         },
    //     });
    //     return { total, data };
    // }
    //
    // public async get(id: number): Promise<Franchisee> {
    //     const data = await UserModel.findOne({
    //         where: {
    //             id,
    //             type: USER_TYPE.FRANCHISE,
    //         },
    //     });
    //     return data;
    // }
    //
    // public async createFranchiseFromLead(data: TConvertLeadToFranchise): Promise<TUser> {
    //     return await UserModel.create({
    //         ...data,
    //         type: USER_TYPE.FRANCHISE,
    //         status: USER_STATUS.ACTIVE,
    //     });
    // }
    //
    // public async create(data: TAddUser): Promise<Franchisee> {
    //     return await UserModel.create({ ...data, type: USER_TYPE.FRANCHISE });
    // }
    //
    // public async update(id: number, data: TEditUser): Promise<[affectedCount: number]> {
    //     return await UserModel.update(data, {
    //         where: {
    //             id,
    //         },
    //     });
    // }
    //
    // public async delete(ids: number[], deletedBy: number): Promise<number> {
    //     const response = await UserModel.destroy({
    //         where: {
    //             id: ids,
    //         },
    //     });
    //
    //     await UserModel.update({
    //         status: USER_STATUS.DELETED,
    //         deletedBy: deletedBy,
    //     }, {
    //         where: {
    //             id: ids,
    //         },
    //     });
    //     return response;
    // }
    //
    // public async getFranchiseByEmail(email: string): Promise<TUser> {
    //     const data = await UserModel.findOne({
    //         where: {
    //             email,
    //             type: USER_TYPE.FRANCHISE,
    //         },
    //     });
    //     return data;
    // }
    //
    // public async deletedList(filters: TListFilters): Promise<any> {
    //     const total = await UserModel.count({
    //         where: {
    //             email: {
    //                 [Op.like]: `%${filters.search}%`,
    //             },
    //             type: USER_TYPE.FRANCHISE,
    //             deletedAt: { [Op.not]: null },
    //         },
    //         paranoid: false,
    //     });
    //     const data = await UserModel.findAll({
    //         order: [filters?.sorting],
    //         offset: filters.offset,
    //         limit: filters.limit,
    //         where: {
    //             email: {
    //                 [Op.like]: `%${filters.search}%`,
    //             },
    //             type: USER_TYPE.FRANCHISE,
    //             deletedAt: { [Op.not]: null },
    //         },
    //         paranoid: false,
    //     });
    //     return { total, data };
    // }
}
