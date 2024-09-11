const { Op } = require("sequelize");
import {
    TListFilters,
    TUser,
    TAddUser,
} from "../../../types";
import { UserModel } from "../../../database/schema";
import IBaseRepo from '../controllers/controller/IUserController';

export class AdminRepo implements IBaseRepo<TUser, TListFilters> {
    constructor() { }

    public async create(data: TAddUser): Promise<TUser | null> {
        return await UserModel.create(data);
    }
}