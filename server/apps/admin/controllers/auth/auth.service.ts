import { Auth } from "apps/admin/models";
import {
    TUpdateAdminToken,
} from "types";

export default class AuthService {
    static async getAdminByEmail(email: string) {
        const obj = new Auth();
        const response = await obj.getAdminByEmail(email);
        return response;
    }

    static async updateRefreshToken(data: TUpdateAdminToken) {
        const obj = new Auth();
        const response = await obj.updateRefreshToken(data);
        return response;
    }

    static async getAdminPassword(id: number) {
        const obj = new Auth();
        const response = await obj.getAdminPassword(id);
        return response;
    }
}
