const { Op } = require("sequelize");
import {
    TRole,
    TRoleFilters,
    TRolesList,
    TAddRole,
} from "../../../types";
import { User as UserModel, Roles } from "../../../database/schema";

export class Admin {
    constructor() { }

    public async getRoleAssigneeByRoleId(ids: string[]): Promise<any> {
        const data = await UserModel.findAll({
            where: {
                role: ids,
                user_type: 'Admin'
            },
        });
        return data ?? null;
    }

    public async getRoleByName(name: string): Promise<TRole | any> {
        const data = await Roles.findOne({
            where: {
                name,
            },
        });
        return data;
    }

    public async getRoleById(id: number): Promise<TRole | any> {
        const data = await Roles.findOne({
            where: {
                id,
            },
        });
        return data;
    }

    public async listRoles(filters: TRoleFilters): Promise<TRolesList | any> {
        const total = await Roles.count({
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await Roles.findAll({
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

    public async addRole(data: TAddRole): Promise<TRole | any> {
        const response = await Roles.create(data);
        return response;
    }

    public async editRole(id: number, data: TAddRole): Promise<TRole | any> {
        const response = await Roles.update(data, {
            where: {
                id,
            },
        });
        return response;
    }

    public async deleteRole(ids: number[]): Promise<TRole | any> {
        const response = await Roles.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
