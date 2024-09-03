const { Op } = require("sequelize");
import {
    TRole,
    TRoleFilters,
    TRolesList,
    TAddRole,
    TEditRole,
    TListFilters,
    TUser
} from "../../../types";
import { USER_TYPE } from '../../../interfaces';
import { UserModel, RolesModel } from "../../../database/schema";
import IBaseRepo from '../controllers/controller/IRolesController';

export class RolesRepo implements IBaseRepo<TRole, TListFilters> {
    constructor() { }

    public async getRoleAssigneeByRoleId(ids: number[]): Promise<TUser[]> {
        const data = await UserModel.findAll({
            where: {
                role: ids,
                type: USER_TYPE.ADMIN,
            },
        });
        return data;
    }

    public async getRoleByName(name: string): Promise<TRole> {
        const data = await RolesModel.findOne({
            where: {
                name,
            },
        });
        return data;
    }

    public async get(id: number): Promise<TRole> {
        const data = await RolesModel.findOne({
            where: {
                id,
            },
        });
        return data;
    }

    public async list(filters: TRoleFilters): Promise<TRolesList> {
        const total = await RolesModel.count({
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await RolesModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        return { total, data };
    }

    public async create(data: TAddRole): Promise<TRole> {
        const response = await RolesModel.create(data);
        return response;
    }

    public async update(id: number, data: TEditRole): Promise<[affectedCount: number]> {
        const response = await RolesModel.update(data, {
            where: {
                id,
            },
        });
        return response;
    }

    public async deleteRole(ids: number[]): Promise<number> {
        const response = await RolesModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
