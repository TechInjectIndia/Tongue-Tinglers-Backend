const { Op } = require("sequelize");
import {
    TProfile,
    TEditProfile
} from "../../../types/";
import { Admin as ProfileModel } from "../../../database/schema";

export class Admin {
    constructor() { }

    public async editProfile(
        id: number,
        data: TEditProfile
    ): Promise<TProfile | any> {
        return await ProfileModel.update(data, {
            where: {
                id,
            },
        });
    }

    public async get(id: number): Promise<TProfile | any> {
        const data = await ProfileModel.findOne({
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
