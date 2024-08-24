import {
    TFranchiseeLogin,
    TUpdateFranchiseeToken,
} from "../../../types";
import { User as UserModel } from "../../../database/schema";

export class Auth {
    constructor() {}

    public async getFranchiseeByEmail(email: string): Promise<TFranchiseeLogin | any> {
        const data = await UserModel.findOne({
            where: {
                email,
                user_type: '1'
            },
        });
        return data;
    }

    public async updateRefreshToken(data: TUpdateFranchiseeToken): Promise<boolean> {
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

    public async getFranchiseePassword(id: number): Promise<
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
