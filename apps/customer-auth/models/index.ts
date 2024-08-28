import {
    TCustomerLogin,
    TUpdateCustomerToken,
} from "../../../types";
import { User as UserModel } from "../../../database/schema";

export class Auth {
    constructor() {}

    public async getCustomerByEmail(email: string): Promise<TCustomerLogin | any> {
        const data = await UserModel.findOne({
            where: {
                email,
                user_type: '1'
            },
        });
        return data;
    }

    public async updateRefreshToken(data: TUpdateCustomerToken): Promise<boolean> {
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

    public async getCustomerPassword(id: number): Promise<
        | {
              password: string;
          }
        | any
    > {
        const data = await UserModel.findOne({
            attributes: ["password"],
            where: {
                id,
                user_type: '1'
            },
        });
        return data;
    }
}
