const { Op } = require("sequelize");
import {
    TListFilters,
    TUser,
    TAddUser,
    TEditUser,
    TEditUserProfile,
    TUsersList,
    TUserWithPermission
} from "../../../types";
import { UserModel, RolesModel } from "../../../database/schema";
import { USER_TYPE, USER_STATUS } from '../../../interfaces';
import IBaseRepo from '../controllers/controller/ICustomerController';

export class CustomerRepo implements IBaseRepo<TUser, TListFilters> {
    constructor() { }

    public async list(filters: TListFilters): Promise<TUsersList> {
        const total = await UserModel.count({
            where: {
                email: {
                    [Op.like]: `%${filters.search}%`,
                },
                type: USER_TYPE.CUSTOMER,
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
                type: USER_TYPE.CUSTOMER
            },
        });
        return { total, data };
    }

    public async get(id: string): Promise<TUserWithPermission> {
        const data = await UserModel.findOne({
            where: {
                id,
            },
        });
        const role = await RolesModel.findOne({
            where: {
                id: data?.dataValues?.role
            }
        })
        return { ...data?.dataValues, permissions: role?.dataValues?.role_permissions ?? '' };
    }

    public async create(data: TAddUser): Promise<TUser> {
        return await UserModel.create({ ...data, type: USER_TYPE.CUSTOMER });
    }

    public async update(id: string, data: TEditUser): Promise<[affectedCount: number]> {
        return await UserModel.update(data, {
            where: {
                id,
            },
        });
    }

    public async delete(ids: string[], deletedBy: number): Promise<number> {
        const response = await UserModel.destroy({
            where: {
                id: ids,
            },
        });

        await UserModel.update({ status: USER_STATUS.DELETED, deletedBy: deletedBy?.toString() }, {
            where: {
                id: ids,
            },
        });
        return response;
    }

    public async deletedList(filters: TListFilters): Promise<TUsersList> {
        const total = await UserModel.count({
            where: {
                email: {
                    [Op.like]: `%${filters.search}%`,
                },
                type: USER_TYPE.CUSTOMER,
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
                type: USER_TYPE.CUSTOMER,
                deletedAt: { [Op.not]: null },
            },
            paranoid: false,
        });
        return { total, data };
    }

    public async restore(ids: string[]): Promise<void> {
        const response = await UserModel.restore({
            where: {
                id: ids,
            },
        });
        return response;
    }

    public async deletePermanant(ids: string[]): Promise<number> {
        const response = await UserModel.destroy({
            where: {
                id: ids,
            },
            force: true,
        });
        return response;
    }

    public async updateProfile(id: string, data: TEditUserProfile): Promise<[affectedCount: number]> {
        return await UserModel.update(data, {
            where: {
                id,
            },
        });
    }
}
