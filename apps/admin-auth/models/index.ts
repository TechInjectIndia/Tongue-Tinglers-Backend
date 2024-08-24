import {
    TAdmin,
    TUpdateAdminToken,
} from "../../../types";
import { User as UserModel } from "../../../database/schema";

export class Auth {
    constructor() {}

    public async getAdminByEmail(email: string): Promise<TAdmin | any> {
        const data = await UserModel.findOne({
            where: {
                email,
                user_type: '0'
            },
        });
        return data;
    }

    public async updateRefreshToken(data: TUpdateAdminToken): Promise<boolean> {
        await UserModel.update(
            {
                refresh_token: data.refresh_token,
                last_login_at: data.last_login_at,
                last_login_ip: data.last_login_ip,
            },
            {
                where: {
                    id: data.user_id,
                    user_type: '0'
                },
            }
        );
        return true;
    }

    public async getAdminPassword(id: number): Promise<
        | {
              password: string;
          }
        | any
    > {
        const data = await UserModel.findAll({
            attributes: ["password"],
            where: {
                id,
                user_type: '0'
            },
        });
        return data ? data[0] : null;
    }
}
