import {
    TFranchiseeLogin,
    TUpdateFranchiseeToken,
} from "../../../types";
import { Franchisee } from "../../../database/schema";

export class Auth {
    constructor() {}

    public async getFranchiseeByEmail(email: string): Promise<TFranchiseeLogin | any> {
        const data = await Franchisee.findOne({
            where: {
                email,
            },
        });
        return data;
    }

    public async updateRefreshToken(data: TUpdateFranchiseeToken): Promise<boolean> {
        await Franchisee.update(
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
        const data = await Franchisee.findOne({
            attributes: ["password"],
            where: {
                id,
            },
        });
        return data;
    }
}
