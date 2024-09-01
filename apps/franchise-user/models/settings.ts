const { Op } = require("sequelize");
import {
    TSettings,
    TEditSettings
} from "../../../types";
import { UserModel } from "../../../database/schema";

export class Admin {
    constructor() { }

    public async editSettings(
        id: number,
        data: TEditSettings
    ): Promise<TSettings | any> {
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
