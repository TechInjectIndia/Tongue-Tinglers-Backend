import { TAddUser, TEditUser, TListFilters, TUser, TUsersList, TUserWithPermission } from "../../../types";
import IGuestUserController from "../controllers/IGuestUserController";
import { RolesModel, UserAddressModel } from "../../../database/schema";
import { GuestUserModel } from "../../../database/schema/user/guestUser.model";
import { USER_STATUS, USER_TYPE } from "../../../interfaces";

const { Op } = require("sequelize");

export class GuestUserRepo
    implements IGuestUserController<TUser, TListFilters>
{
    constructor() {}

    public async getAllUsers(filters: TListFilters): Promise<TUsersList> {
        const total = await GuestUserModel.count({
            where: {
                [Op.or]: [
                    { firstName: { [Op.iLike]: `%${filters.search}%` } },
                    { lastName: { [Op.iLike]: `%${filters.search}%` } },
                    { email: { [Op.iLike]: `%${filters.search}%` } },
                ],
            },
        });
        const data = await GuestUserModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                [Op.or]: [
                    { firstName: { [Op.iLike]: `%${filters.search}%` } },
                    { lastName: { [Op.iLike]: `%${filters.search}%` } },
                    { email: { [Op.iLike]: `%${filters.search}%` } },
                ],
            },
        });
        return { total, data };
    }

    public async get(id: number): Promise<TUserWithPermission> {
        const data = await GuestUserModel.findOne({
            where: {
                [Op.or]: [{ id: id }, { firebaseUid: id }],
            },
            include: [
                {
                    model: UserAddressModel,
                    as: "address",
                    order: [["isActive", "ASC"]],
                },
            ],
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

    public async create(data: TAddUser): Promise<TUser> {
        return await GuestUserModel.create({ ...data, type: USER_TYPE.FRANCHISE });
    }

    public async update(id: number, data: TEditUser): Promise<[affectedCount: number]> {
        return await GuestUserModel.update(data, {
            where: {
                id,
            },
        });
    }

    public async delete(ids: number[], deletedBy: number): Promise<number> {
        const response = await GuestUserModel.destroy({
            where: {
                id: ids,
            },
        });

        await GuestUserModel.update({ status: USER_STATUS.DELETED, deletedBy: deletedBy }, {
            where: {
                id: ids,
            },
        });
        return response;
    }

}
