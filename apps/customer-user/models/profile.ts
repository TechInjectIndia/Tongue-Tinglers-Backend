const { Op } = require("sequelize");
import {
    TProfile,
    TEditProfile
} from "../../../types/";
import { User as UserModel } from "../../../database/schema";

export class Admin {
    constructor() { }

    public async editProfile(
        id: number,
        data: TEditProfile
    ): Promise<TProfile | any> {
        return await UserModel.update(data, {
            where: {
                id,
                user_type: 'Admin'
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
                "last_login_at",
                "last_login_ip",
                "createdAt",
                "active",
            ],
            where: {
                id,
                user_type: 'Admin'
            },
        });
        return data;
    }

}
