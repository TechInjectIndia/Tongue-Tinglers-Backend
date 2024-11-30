const { Op } = require("sequelize");
import {
    TListFilters,
    TUser,
    TAddUser,
    TEditUser,
    TConvertLeadToFranchise
} from "../../../types";
import { UserModel } from "../../../database/schema";
import { USER_TYPE, USER_STATUS } from '../../../interfaces';
import IBaseRepo from '../controllers/controller/IFranchiseController';

export class FranchiseRepo implements IBaseRepo<TUser, TListFilters> {
    constructor() { }

    public async list(filters: TListFilters): Promise<any> {
        const total = await UserModel.count({
            where: {
                email: {
                    [Op.iLike]: `%${filters.search}%`,
                },
                type: USER_TYPE.FRANCHISE
            },
        });
        const data = await UserModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                email: {
                    [Op.iLike]: `%${filters.search}%`,
                },
                type: USER_TYPE.FRANCHISE
            },
        });
        return { total, data };
    }

    public async get(id: number): Promise<TUser> {
        const data = await UserModel.findOne({
            where: {
                id,
                type: USER_TYPE.FRANCHISE
            },
        });
        return data;
    }

    public async createFranchiseFromLead(data: TConvertLeadToFranchise): Promise<TUser> {
        return await UserModel.create({ ...data, type: USER_TYPE.FRANCHISE, status: USER_STATUS.ACTIVE });
    }

    public async create(data: TAddUser): Promise<TUser> {
        return await UserModel.create({ ...data, type: USER_TYPE.FRANCHISE });
    }

    public async update(id: number, data: TEditUser): Promise<[affectedCount: number]> {
        return await UserModel.update(data, {
            where: {
                id,
            },
        });
    }

    public async delete(ids: number[], deletedBy: number): Promise<number> {
        const response = await UserModel.destroy({
            where: {
                id: ids,
            },
        });

        await UserModel.update({
            status: USER_STATUS.DELETED,
            deletedBy: deletedBy
        }, {
            where: {
                id: ids,
            },
        });
        return response;
    }

    public async getFranchiseByEmail(email: string): Promise<TUser> {
        const data = await UserModel.findOne({
            where: {
                email,
                type: USER_TYPE.FRANCHISE
            },
        });
        return data;
    }

    public async deletedList(filters: TListFilters): Promise<any> {
        const total = await UserModel.count({
            where: {
                email: {
                    [Op.iLike]: `%${filters.search}%`,
                },
                type: USER_TYPE.FRANCHISE,
                deletedAt: { [Op.not]: null },
            },
            paranoid: false,
        });
        const data = await UserModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                email: {
                    [Op.iLike]: `%${filters.search}%`,
                },
                type: USER_TYPE.FRANCHISE,
                deletedAt: { [Op.not]: null },
            },
            paranoid: false,
        });
        return { total, data };
    }
}
