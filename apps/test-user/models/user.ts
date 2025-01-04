import {UserModel} from "../../user/models/UserTable";

const { Op } = require("sequelize");
import {
    TListFilters,
    TUser,
    TAddUser,
} from "../../../types";

import IBaseRepo from '../controllers/controller/IUserController';

export class AdminRepo implements IBaseRepo<TUser, TListFilters> {
    constructor() { }

    public async create(data: TAddUser): Promise<TUser | null> {
        return await UserModel.create(data as any);
    }
}
