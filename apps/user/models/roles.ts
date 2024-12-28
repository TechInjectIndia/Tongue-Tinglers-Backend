const { Op } = require("sequelize");
import {
    TRole,
    TRoleFilters,
    TRolesList,
    TRolePayload,
    TListFilters,
    TUser
} from "../../../types";
import { USER_TYPE } from '../../../interfaces';
import { UserModel, RolesModel } from "../../../database/schema";
import IBaseRepo from '../controllers/IRolesController';

export class RolesRepo implements IBaseRepo<TRole, TListFilters> {
    constructor() { }

    public async getRoleAssigneeByRoleId(ids: number[]): Promise<TUser[]> {
        const data = await UserModel.findAll({
            where: {
                role: ids,
                type: USER_TYPE.SUPER_FRANSHISE,
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
                    [Op.iLike]: `%${filters.search}%`,
                },
            },
        });
        const data = await RolesModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                name: {
                    [Op.iLike]: `%${filters.search}%`,
                },
            },
        });
        return { total, data };
    }

    public async create(data: TRolePayload): Promise<TRole> {
        const permissions = JSON.parse(data.role_permissions)
        const response = await RolesModel.create({ ...data, role_permissions: permissions });
        return response;
    }

    public async update(id: number, data: TRolePayload): Promise<[affectedCount: number]> {
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
