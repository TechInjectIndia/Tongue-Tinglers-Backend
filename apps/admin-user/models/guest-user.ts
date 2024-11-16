import { TListFilters, TUser, TUserWithPermission } from "../../../types";
import IGuestUserController from "../controllers/controller/IGuestUserController";
import { RolesModel, UserAddressModel } from "../../../database/schema";
import { GuestUserModel } from "../../../database/schema/user/guestUser.model";

const { Op } = require("sequelize");

export class GuestUserRepo
    implements IGuestUserController<TUser, TListFilters>
{
    constructor() {}

    public async get(id: string): Promise<TUserWithPermission> {
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
}
