const { Op } = require("sequelize");
import {
    TProfile,
    TEditProfile
} from "../../../types/";
import { UserModel } from "../../../database/schema";

export class Admin {
    constructor() { }

    public async editProfile(
        id: number,
        data: TEditProfile
    ): Promise<TProfile | any> {
        return await UserModel.update(data, {
            where: {
                id,
                type: 'admin'
            },
        });
    }

    public async get(id: number): Promise<TProfile | any> {
        const data = await UserModel.findOne({
            raw: true,
            where: {
                id,
                type: 'admin'
            },
        });
        return data;
    }

}