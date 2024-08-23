const { Op } = require("sequelize");
import {
    TSettings,
    TEditSettings
} from "../../../types";
import { Admin as SettingsModel } from "../../../database/schema";

export class Admin {
    constructor() { }

    public async editSettings(
        id: number,
        data: TEditSettings
    ): Promise<TSettings | any> {
        return await SettingsModel.update(data, {
            where: {
                id,
            },
        });
    }

    public async get(id: number): Promise<TSettings | any> {
        const data = await SettingsModel.findOne({
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
            },
        });
        return data;
    }

}
