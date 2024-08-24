const { Op } = require("sequelize");
import {
    TRole,
    TAddRole,
    TRoleFilters,
    TListFilters,
    TAdmin,
    TAddAdmin,
    TEditAdmin,
    TRolesList,
    TEditAdminProfile,
} from "apps/admin/controllers/admin/admin.types";
import { AdminRole, User as UserModel } from "database/schema";

export class Admin {
    constructor() {}

    public async getRoleByName(name: string): Promise<TRole | any> {
        const data = await AdminRole.findAll({
            where: {
                name,
            },
        });
        return data ? data[0] : null;
    }

    public async getRoleById(id: number): Promise<TRole | any> {
        const data = await AdminRole.findAll({
            where: {
                id,
            },
        });
        return data ? data[0] : null;
    }

    public async getRoles(filters: TRoleFilters): Promise<TRolesList | any> {
        const total = await AdminRole.count({
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await AdminRole.findAll({
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
        const response = await AdminRole.create(data);
        return response;
    }

    public async editRole(id: number, data: TAddRole): Promise<TRole | any> {
        const response = await AdminRole.update(data, {
            where: {
                id,
            },
        });
        return response;
    }

    public async deleteRole(ids: number[]): Promise<TRole | any> {
        const response = await AdminRole.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }

    public async getDeletedAdmins(filters: TListFilters): Promise<any | null> {
        const total = await AdminModel.count({
            where: {
                email: {
                    [Op.like]: `%${filters.search}%`,
                },
                deletedAt: { [Op.not]: null },
            },
            paranoid: false,
        });
        const data = await AdminModel.findAll({
            attributes: [
                "id",
                "email",
                "full_name",
                "contact_number",
                "phone_code",
                "role",
                "profile_photo",
                "address",
                "last_login_at",
                "last_login_ip",
                "createdAt",
                "active",
            ],
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                email: {
                    [Op.like]: `%${filters.search}%`,
                },
                deletedAt: { [Op.not]: null },
            },
            paranoid: false,
        });
        return { total, data };
    }

    public async getAdmins(filters: TListFilters): Promise<any | null> {
        const total = await AdminModel.count({
            where: {
                email: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await AdminModel.findAll({
            attributes: [
                "id",
                "email",
                "full_name",
                "contact_number",
                "phone_code",
                "role",
                "profile_photo",
                "address",
                "last_login_at",
                "last_login_ip",
                "createdAt",
                "active",
            ],
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                email: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        return { total, data };
    }

    public async addAdmin(data: TAddAdmin): Promise<TAdmin | any> {
        return await AdminModel.create(data);
    }

    public async editAdmin(
        id: number,
        data: TEditAdmin
    ): Promise<TAdmin | any> {
        return await AdminModel.update(data, {
            where: {
                id,
            },
        });
    }

    public async getAdminById(id: number): Promise<TAdmin | any> {
        const data = await AdminModel.findAll({
            attributes: [
                "id",
                "email",
                "full_name",
                "contact_number",
                "phone_code",
                "role",
                "profile_photo",
                "address",
                "last_login_at",
                "last_login_ip",
                "createdAt",
                "active",
            ],
            where: {
                id,
            },
        });
        return data ? data[0] : null;
    }

    public async deleteAdmin(ids: number[]): Promise<TRole | any> {
        const response = await AdminModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }

    public async editProfile(
        id: number,
        data: TEditAdminProfile
    ): Promise<TAdmin | any> {
        return await AdminModel.update(data, {
            where: {
                id,
            },
        });
    }

    public async getRoleAssigneeByRoleId(ids: string[]): Promise<any> {
        const data = await AdminModel.findAll({
            where: {
                role: ids,
            },
        });
        return data ?? null;
    }

    public async restoreAdmin(ids: number[]): Promise<TRole | any> {
        const response = await AdminModel.restore({
            where: {
                id: ids,
            },
        });
        return response;
    }

    public async deleteAdminPermanant(ids: number[]): Promise<TRole | any> {
        const response = await AdminModel.destroy({
            where: {
                id: ids,
            },
            force: true,
        });
        return response;
    }
}
