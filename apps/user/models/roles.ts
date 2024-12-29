import { TRole, TRoleFilters, TRolesList } from "types";
import { TUser, USER_TYPE } from "../interface/User";
import { UserModel } from "./UserTable";

const { Op } = require("sequelize");

export class RolesRepo {
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

}
