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
            },
        });
        return data;
    }

    public async getUserByFirebaseId(token: string): Promise<TUser | any> {
        const data = await UserModel.findOne({
            where: {
                password_token: token,
            },
        });
        return data;
    }

    public async removePasswordToken(token: string): Promise<TUser | any> {
        const data = await UserModel.update(
            {
                password_token: null,
            },
            {
                where: {
                    password_token: token,
                },
            }
        );
        return data;
    }

    public async updateRefreshToken(data: TUpdateUserToken): Promise<boolean> {
        await UserModel.update(
            {
                refresh_token: data.refresh_token,
                lastLoginAt: data.lastLoginAt,
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
