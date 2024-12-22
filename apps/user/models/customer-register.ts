const { Op } = require("sequelize");
import {
    TListFilters,
    TUser,
    TAddUser,
} from "../../../types";
import { UserModel, RolesModel } from "../../../database/schema";
import IBaseRepo from '../controllers/controller/ICustomerRegisterController';

export class CustomerRegisterRepo implements IBaseRepo<TUser, TListFilters> {
    constructor() { }

    public async get(email: string): Promise<TUser | null> {
        const data = await UserModel.findOne({
            where: {
                email,
            },
        });
        return data;
    }

    public async create(data: TAddUser): Promise<TUser> {
        return await UserModel.create(data);
    }

}
