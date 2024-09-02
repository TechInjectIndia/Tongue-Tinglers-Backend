const { Op } = require("sequelize");
import {
    TProfile,
    TEditUserProfile
} from "../../../types/";
import { UserModel } from "../../../database/schema";

export class Admin {
    constructor() { }

    public async editProfile(
        id: number,
        data: TEditUserProfile
    ): Promise<[affectedCount: number]> {
        return await UserModel.update(data, {
            where: {
                id,
            },
        });
    }

    public async get(id: number): Promise<TProfile | any> {
        const data = await UserModel.findOne({
            raw: true,
            attributes: [
                "id",
                "email",
                "full_name",
                "contact_number",
                "phone_code",
                "address",
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
