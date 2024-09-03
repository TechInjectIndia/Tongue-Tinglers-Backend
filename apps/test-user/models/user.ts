const { Op } = require("sequelize");
import {
    TListFilters,
    TUser,
    TAddUser,
} from "../../../types";
import { UserModel } from "../../../database/schema";
import { USER_TYPE } from '../../../interfaces';
import IBaseRepo from '../controllers/controller/IController';

export class AdminRepo implements IBaseRepo<TUser, TListFilters> {
    constructor() { }

    public async create(data: TAddUser): Promise<TUser> {
        return await UserModel.create({ ...data, type: USER_TYPE.ADMIN });
    }
}
