import {
    TUser,
    TUpdateUserToken,
    TUpdateUserPassword
} from "../../../types";
import { User as UserModel } from "../../../database/schema";

export class Auth {
    constructor() { }

    public async changePassword(data: TUpdateUserPassword): Promise<boolean> {
        await UserModel.update(
            {
                password: data.password,
            },
            {
                where: {
                    id: data.user_id,
                },
            }
        );
        return true;
    }

    public async getUserPassword(id: number): Promise<
        | {
            password: string;
        }
        | any
    > {
        const data = await UserModel.findAll({
            raw: true,
            attributes: ["password"],
            where: {
                id,
            },
        });
        return data;
    }

    public async getUserByEmail(email: string): Promise<TUser | any> {
        const data = await UserModel.findOne({
            where: {
                email,
                user_type: '0'
            },
        });
        return data;
    }

    public async updateRefreshToken(data: TUpdateUserToken): Promise<boolean> {
        await UserModel.update(
            {
                refresh_token: data.refresh_token,
                last_login_at: data.last_login_at,
                last_login_ip: data.last_login_ip,
            },
            {
                where: {
                    id: data.user_id,
                },
            }
        );
        return true;
    }
}
