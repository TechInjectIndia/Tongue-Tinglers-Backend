const { Op } = require("sequelize");
import {
    TSettings,
    TEditSettings
} from "../../../types";
import { User as UserModel } from "../../../database/schema";

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
            attributes: [
                "id",
                "email",
                "full_name",
                "contact_number",
                "phone_code",
                "address",
                "last_login_at",
                "last_login_ip",
                "createdAt",
                "active",
            ],
            where: {
                id,
                user_type: '0'
            },
        });
        return data;
    }

}