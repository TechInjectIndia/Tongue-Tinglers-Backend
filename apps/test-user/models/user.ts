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
import { UserModel, Roles } from "../../../database/schema";
import { USER_TYPE, USER_STATUS } from '../../../interfaces';
import IBaseRepo from '../controllers/controller/IController';

export class AdminRepo implements IBaseRepo<TUser, TListFilters> {
    constructor() { }

    public async create(data: TAddUser): Promise<TUser> {
        return await UserModel.create({ ...data, type: USER_TYPE.ADMIN });
    }
}
