import { Admin } from "apps/admin/models";
import {
    TAddRole,
    TRoleFilters,
    TListFilters,
    TAddAdmin,
    TEditAdmin,
    TEditAdminProfile,
} from "apps/admin/controllers/admin/admin.types";

export default class AdminService {
    static async getRoleByName(name: string) {
        const obj = new Admin();
        const response = await obj.getRoleByName(name);
        return response;
    }

    static async getRoleById(id: number) {
        const obj = new Admin();
        const response = await obj.getRoleById(id);
        return response;
    }

    static async getRoles(data: TRoleFilters) {
        const obj = new Admin();
        const response = await obj.getRoles(data);
        return response;
    }

    static async addRole(data: TAddRole) {
        const obj = new Admin();
        const response = await obj.addRole(data);
        return response;
    }

    static async editRole(id: number, data: TAddRole) {
        const obj = new Admin();
        const response = await obj.editRole(id, data);
        return response;
    }

    static async deleteRole(ids: number[]) {
        const obj = new Admin();
        const response = await obj.deleteRole(ids);
        return response;
    }

    static async getAdmins(data: TListFilters) {
        const obj = new Admin();
        const response = data?.trashOnly
            ? await obj.getDeletedAdmins(data)
            : await obj.getAdmins(data);
        return response;
    }

    static async addAdmin(data: TAddAdmin) {
        const obj = new Admin();
        const response = await obj.addAdmin(data);
        return response;
    }

    static async editAdmin(id: number, data: TEditAdmin) {
        const obj = new Admin();
        const response = await obj.editAdmin(id, data);
        return response;
    }

    static async getAdminById(id: number) {
        const obj = new Admin();
        const response = await obj.getAdminById(id);
        return response;
    }

    static async deleteAdmin(ids: number[]) {
        const obj = new Admin();
        const response = await obj.deleteAdmin(ids);
        return response;
    }

    static async editProfile(id: number, data: TEditAdminProfile) {
        const obj = new Admin();
        const response = await obj.editProfile(id, data);
        return response;
    }

    static async getRoleAssigneeByRoleId(ids: string[]) {
        const obj = new Admin();
        const response = await obj.getRoleAssigneeByRoleId(ids);
        return response;
    }

    static async restoreAdmin(ids: number[]) {
        const obj = new Admin();
        const response = await obj.restoreAdmin(ids);
        return response;
    }

    static async deleteAdminPermanant(ids: number[]) {
        const obj = new Admin();
        const response = await obj.deleteAdminPermanant(ids);
        return response;
    }
}
