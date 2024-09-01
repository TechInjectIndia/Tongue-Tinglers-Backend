const { Op } = require("sequelize");
import {
    TPermission,
    TAddPermission,
    TPermissionFilters,
    TPermissionsList,
} from "../../../types";
import { UserModel, Permissions } from "../../../database/schema";

export class Admin {
    constructor() { }

    public async getPermissionByName(name: string): Promise<TPermission | any> {
        const data = await Permissions.findOne({
            where: {
                name,
            },
        });
        return data;
    }

    public async getPermissionById(id: number): Promise<TPermission | any> {
        const data = await Permissions.findOne({
            where: {
                id,
            },
        });
        return data;
    }

    public async listPermissions(filters: TPermissionFilters): Promise<TPermissionsList | any> {
        const total = await Permissions.count({
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await Permissions.findAll({
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

    public async getPermissions(filters: TPermissionFilters): Promise<TPermissionsList | any> {
        const total = await Permissions.count({
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await Permissions.findAll({
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

    public async addPermission(data: TAddPermission): Promise<TPermission | any> {
        const response = await Permissions.create(data);
        return response;
    }

    public async editPermission(id: number, data: TAddPermission): Promise<TPermission | any> {
        const response = await Permissions.update(data, {
            where: {
                id,
            },
        });
        return response;
    }

    public async deletePermission(ids: number[]): Promise<TPermission | any> {
        const response = await Permissions.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }

    public async getPermissionAssigneeByPermissionId(ids: string[]): Promise<any> {
        const data = await UserModel.findAll({
            where: {
                role: ids,
                type: 'admin'
            },
        });
        return data ?? null;
    }
}
