const { Op } = require("sequelize");
import {
    TSettings,
    TEditUserProfile
} from "../../../types";
import { UserModel } from "../../../database/schema";

export class Admin {
    constructor() { }

    public async editSettings(
        id: number,
        data: TEditUserProfile
    ): Promise<[affectedCount: number]> {
        return await UserModel.update(data, {
            where: {
                id,
            },
        });
    }

    public async get(id: number): Promise<TSettings | any> {
        const data = await UserModel.findOne({
            where: {
                id,
                type: 'Admin'
            },
        });
        return data;
    }

}
