const { Op } = require("sequelize");
import {
    TListFilters,
    TFranchisee,
    TAddFranchisee,
    TEditFranchisee,
} from "../../../types";
import { User as UserModel } from "../../../database/schema";
import { USER_TYPE } from '../../../interfaces';

export class Admin {
    constructor() { }

    public async getDeletedFranchisees(filters: TListFilters): Promise<any | null> {
        const total = await UserModel.count({
            where: {
                email: {
                    [Op.like]: `%${filters.search}%`,
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
                    [Op.like]: `%${filters.search}%`,
                },
                type: USER_TYPE.FRANCHISE,
                deletedAt: { [Op.not]: null },
            },
            paranoid: false,
        });
        return { total, data };
    }

    public async getFranchisees(filters: TListFilters): Promise<any | null> {
        const total = await UserModel.count({
            where: {
                email: {
                    [Op.like]: `%${filters.search}%`,
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
                    [Op.like]: `%${filters.search}%`,
                },
                type: USER_TYPE.FRANCHISE
            },
        });
        return { total, data };
    }

    public async addFranchisee(data: TAddFranchisee): Promise<TFranchisee | any> {
        return await UserModel.create({ ...data, type: USER_TYPE.FRANCHISE });
    }

    public async editFranchisee(
        id: number,
        data: TEditFranchisee
    ): Promise<TFranchisee | any> {
        return await UserModel.update(data, {
            where: {
                id,
            },
        });
    }

    public async getFranchiseeByEmail(email: string): Promise<TFranchisee | any> {
        const data = await UserModel.findOne({
            where: {
                email,
                type: USER_TYPE.FRANCHISE
            },
        });
        return data;
    }

    public async getFranchiseeById(id: number): Promise<TFranchisee | any> {
        const data = await UserModel.findOne({
            where: {
                id,
                type: USER_TYPE.FRANCHISE
            },
        });
        return data;
    }

    public async deleteFranchisee(ids: number[]): Promise<TFranchisee | any> {
        const response = await UserModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
