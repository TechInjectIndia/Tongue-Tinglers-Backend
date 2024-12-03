const { Op } = require("sequelize");
import {
    TListFilters,
    TUser,
    TAddUser,
    TEditUser,
    TEditUserProfile,
    TUsersList,
    TUserWithPermission,
    TUpdateUserReferralCode,
} from "../../../types";
import {
    UserModel,
    RolesModel,

} from "../../../database/schema";
import { USER_TYPE, USER_STATUS } from "../../../interfaces";
import IBaseRepo from "../controllers/controller/IUserController";

export class AdminRepo implements IBaseRepo<TUser, TListFilters> {
    constructor() { }

    public async getByReferralCode(referralCode: string) {
        const data = await UserModel.findOne({
            where: { referralCode: referralCode },
        });
        return data;
    }

    public async getAllFranchiseByCode(referralCode: string) {
        const franchisee = await UserModel.findAll({
            where: { referBy: referralCode },
        });
        return franchisee;
    }

    public async existsByReferralCode(referralCode: string): Promise<boolean> {
        const count = await UserModel.count({
            where: { referralCode: referralCode },
        });
        return count > 0;
    }

    public async saveReferral(
        id: number,
        data: TUpdateUserReferralCode
    ): Promise<[affectedCount: number]> {
        return await UserModel.update(data, {
            where: {
                id,
            },
        });
    }

    public async getAllUsers(filters: TListFilters): Promise<TUsersList> {
        const total = await UserModel.count({
            where: {
                [Op.or]: [
                    { firstName: { [Op.like]: `%${filters.search}%` } },
                    { lastName: { [Op.like]: `%${filters.search}%` } },
                    { email: { [Op.like]: `%${filters.search}%` } },
                ],
            },
        });
        const data = await UserModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                [Op.or]: [
                    { firstName: { [Op.like]: `%${filters.search}%` } },
                    { lastName: { [Op.like]: `%${filters.search}%` } },
                    { email: { [Op.like]: `%${filters.search}%` } },
                ],
            },
        });
        return { total, data };
    }

    public async list(filters: TListFilters): Promise<TUsersList> {
        const total = await UserModel.count({
            where: {
                email: {
                    [Op.like]: `%${filters.search}%`,
                },
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
            },
        });
        return { total, data };
    }

    public async getUsingFireaseUid(id: string): Promise<TUserWithPermission> {
        const data = await UserModel.findOne({
            where: { firebaseUid: id },

            // include: [
            //     {
            //         model: UserAddressModel,
            //         as: "address",
            //         order: [["isActive", "ASC"]],
            //     },
            // ],
        });
        if (data) {
            const role = await RolesModel.findOne({
                raw: true,
                where: {
                    id: data?.dataValues.role,
                },
            });
            return {
                ...data.dataValues,
                permissions: role?.role_permissions ?? "",
            };
        } else {
            return { ...data.dataValues, permissions: "" };
        }
    }

    public async get(id: number): Promise<TUserWithPermission> {
        const data = await UserModel.findOne({
            where: {
                [Op.or]: [{ id: id }, { firebaseUid: id }],
            },
            // include: [
            //     {
            //         model: UserAddressModel,
            //         as: "address",
            //         order: [["isActive", "ASC"]],
            //     },
            // ],
        });
        if (data) {
            const role = await RolesModel.findOne({
                raw: true,
                where: {
                    id: data?.dataValues.role,
                },
            });
            return {
                ...data.dataValues,
                permissions: role?.role_permissions ?? "",
            };
        } else {
            return { ...data.dataValues, permissions: "" };
        }
    }

    public async checkIfUserExist(id: number): Promise<any> {
        const data = await UserModel.findOne({
            raw: true,
            where: {
                id: id,
            },
        });
        return data;
    }

    public async create(data: TAddUser): Promise<TUser> {
        return await UserModel.create({ ...data });
    }

    public async update(
        id: number,
        data: TEditUser
    ): Promise<[affectedCount: number]> {
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

        await UserModel.update(
            { status: USER_STATUS.DELETED, deletedBy: deletedBy },
            {
                where: {
                    id: ids,
                },
            }
        );
        return response;
    }

    public async deletedList(filters: TListFilters): Promise<TUsersList> {
        const total = await UserModel.count({
            where: {
                email: {
                    [Op.like]: `%${filters.search}%`,
                },
                type: USER_TYPE.MASTER_FRANCHISE,
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
                type: USER_TYPE.MASTER_FRANCHISE,
                deletedAt: { [Op.not]: null },
            },
            paranoid: false,
        });
        return { total, data };
    }

    public async restore(ids: number[]): Promise<void> {
        const response = await UserModel.restore({
            where: {
                id: ids,
            },
        });
        return response;
    }

    public async deletePermanant(ids: number[]): Promise<number> {
        const response = await UserModel.destroy({
            where: {
                id: ids,
            },
            force: true,
        });
        return response;
    }

    public async updateProfile(
        id: number,
        data: TEditUserProfile
    ): Promise<[affectedCount: number]> {
        return await UserModel.update(data, {
            where: {
                id,
            },
        });
    }
}
