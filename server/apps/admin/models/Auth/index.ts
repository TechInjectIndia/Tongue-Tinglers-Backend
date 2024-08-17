import {
    TAdmin,
    TUpdateAdminToken,
} from "types";
import { Admin as AdminModel } from "database/schema";

export class Auth {
    constructor() {}

    public async getAdminByEmail(email: string): Promise<TAdmin | any> {
        const data = await AdminModel.findAll({
            where: {
                email,
            },
        });
        return data ? data[0] : null;
    }

    public async updateRefreshToken(data: TUpdateAdminToken): Promise<boolean> {
        await AdminModel.update(
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

    public async getAdminPassword(id: number): Promise<
        | {
              password: string;
          }
        | any
    > {
        const data = await AdminModel.findAll({
            attributes: ["password"],
            where: {
                id,
            },
        });
        return data ? data[0] : null;
    }
}
