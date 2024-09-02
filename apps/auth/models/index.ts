import {
    TUser,
    TUpdateUserToken,
    TUpdateUserPassword
} from "../../../types";
import { UserModel } from "../../../database/schema";
import { USER_TYPE } from '../../../interfaces';

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
        const data = await UserModel.findOne({
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
                type: USER_TYPE.ADMIN
            },
        });
        return data;
    }

    public async updateRefreshToken(data: TUpdateUserToken): Promise<boolean> {
        await UserModel.update(
            {
                refresh_token: data.refresh_token,
                lastLoginAt: data.lastLoginAt,
                lastLoginIp: data.lastLoginIp,
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
