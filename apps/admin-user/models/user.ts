const { Op } = require("sequelize");
import {
    TRole,
    TListFilters,
    TUser,
    TAddUser,
    TEditUser,
    TEditUserProfile,
} from "../../../types";
import { User as UserModel, Roles } from "../../../database/schema";
import { USER_TYPE } from '../../../interfaces';

export class Admin {
    constructor() { }

    public async getDeletedAdmins(filters: TListFilters): Promise<any | null> {
        const total = await UserModel.count({
            where: {
                email: {
                    [Op.like]: `%${filters.search}%`,
                },
                type: USER_TYPE.ADMIN,
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
                type: USER_TYPE.ADMIN,
                deletedAt: { [Op.not]: null },
            },
            paranoid: false,
        });
        return { total, data };
    }

    public async getAdmins(filters: TListFilters): Promise<any | null> {
        const total = await UserModel.count({
            where: {
                email: {
                    [Op.like]: `%${filters.search}%`,
                },
                type: USER_TYPE.ADMIN,
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
                type: USER_TYPE.ADMIN
            },
        });
        return { total, data };
    }

    public async addAdmin(data: TAddUser): Promise<TUser | any> {
        return await UserModel.create({ ...data, type: USER_TYPE.ADMIN });
    }

    public async editAdmin(
        id: number,
        data: TEditUser
    ): Promise<TUser | any> {
        return await UserModel.update(data, {
            where: {
                id,
            },
        });
    }

    public async getAdminById(id: number): Promise<TUser | any> {
        const data = await UserModel.findOne({
            where: {
                id,
            },
        });
        const role = await Roles.findOne({
            where: {
                id: data?.dataValues?.role
            }
        })
        return { ...data?.dataValues, permissions: role?.dataValues?.role_permissions ?? '' };
    }

    public async deleteAdmin(ids: number[]): Promise<TRole | any> {
        const response = await UserModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }

    public async editProfile(
        id: number,
        data: TEditUserProfile
    ): Promise<TUser | any> {
        return await UserModel.update(data, {
            where: {
                id,
            },
        });
    }

    public async restoreAdmin(ids: number[]): Promise<TRole | any> {
        const response = await UserModel.restore({
            where: {
                id: ids,
            },
        });
        return response;
    }

    public async deleteAdminPermanant(ids: number[]): Promise<TRole | any> {
        const response = await UserModel.destroy({
            where: {
                id: ids,
            },
            force: true,
        });
        return response;
    }
}
