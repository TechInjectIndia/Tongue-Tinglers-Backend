const { Op } = require("sequelize");
import {
    TSettings,
    TEditUserProfile
} from "../../../types";
import { UserModel } from "../../../database/schema";

export class SettingsRepo {
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
            attributes: [
                "id",
                "email",
                "full_name",
                "contact_number",
                "phone_code",
                "address",
                "lastLoginAt",
                "lastLoginIp",
                "createdAt",
                "active",
            ],
            where: {
                id,
                type: 'admin'
            },
        });
        return data;
    }

}
