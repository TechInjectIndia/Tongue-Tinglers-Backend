const { Op } = require("sequelize");
import {
    TRole,
    TListFilters,
    TAdmin,
    TAddAdmin,
    TEditAdmin,
    TEditAdminProfile,
    TFranchisee,
    TAddFranchisee,
    TEditFranchisee,
    TRoleFilters,
    TRolesList,
    TAddRole,
    TPermission,
    TAddPermission,
    TPermissionFilters,
    TPermissionsList,
} from "../../../types";
import { User as UserModel, Roles, Permissions } from "../../../database/schema";

export class Admin {
    constructor() { }

    public async getRoleByName(name: string): Promise<TRole | any> {
        const data = await Roles.findOne({
            where: {
                name,
            },
        });
        return data;
    }

    public async getRoleById(id: number): Promise<TRole | any> {
        const data = await Roles.findOne({
            where: {
                id,
            },
        });
        return data;
    }

    public async listRoles(filters: TRoleFilters): Promise<TRolesList | any> {
        const total = await Roles.count({
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await Roles.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        return { total, data };
    }

    public async addRole(data: TAddRole): Promise<TRole | any> {
        const response = await Roles.create(data);
        return response;
    }

    public async editRole(id: number, data: TAddRole): Promise<TRole | any> {
        const response = await Roles.update(data, {
            where: {
                id,
            },
        });
        return response;
    }

    public async deleteRole(ids: number[]): Promise<TRole | any> {
        const response = await Roles.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }

    public async getDeletedAdmins(filters: TListFilters): Promise<any | null> {
        const total = await UserModel.count({
            where: {
                email: {
                    [Op.like]: `%${filters.search}%`,
                },
                user_type: '0',
                deletedAt: { [Op.not]: null },
            },
            paranoid: false,
        });
        const data = await UserModel.findAll({
            attributes: [
                "id",
                "email",
                "full_name",
                "contact_number",
                "phone_code",
                "role",
                "profile_photo",
                "address",
                "last_login_at",
                "last_login_ip",
                "createdAt",
                "active",
            ],
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                email: {
                    [Op.like]: `%${filters.search}%`,
                },
                user_type: '0',
                deletedAt: { [Op.not]: null },
            },
            paranoid: false,
        });
        return { total, data };
    }

    public async getAdmins(filters: TListFilters): Promise<any | null> {
        const total = await UserModel.count({
            where: {
                email: {
                    [Op.like]: `%${filters.search}%`,
                },
                user_type: '0',
            },
        });
        const data = await UserModel.findAll({
            attributes: [
                "id",
                "email",
                "full_name",
                "contact_number",
                "phone_code",
                "role",
                "profile_photo",
                "address",
                "last_login_at",
                "last_login_ip",
                "createdAt",
                "active",
            ],
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                email: {
                    [Op.like]: `%${filters.search}%`,
                },
                user_type: '0'
            },
        });
        return { total, data };
    }

    public async addAdmin(data: TAddAdmin): Promise<TAdmin | any> {
        return await UserModel.create({ ...data, user_type: '0' });
    }

    public async editAdmin(
        id: number,
        data: TEditAdmin
    ): Promise<TAdmin | any> {
        return await UserModel.update(data, {
            where: {
                id,
                user_type: '0'
            },
        });
    }

    public async getAdminById(id: number): Promise<TAdmin | any> {
        const data = await UserModel.findOne({
            attributes: [
                "id",
                "email",
                "full_name",
                "contact_number",
                "phone_code",
                "role",
                "profile_photo",
                "address",
                "last_login_at",
                "last_login_ip",
                "createdAt",
                "active",
            ],
            where: {
                id,
                user_type: '0'
            },
        });
        const role = await Roles.findOne({
            where: {
                id: data?.dataValues?.role
            }
        })
        return { ...data?.dataValues, permissions: role?.dataValues?.role_permissions ?? '' };
    }

    public async deleteAdmin(ids: number[]): Promise<TRole | any> {
        const response = await UserModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }

    public async editProfile(
        id: number,
        data: TEditAdminProfile
    ): Promise<TAdmin | any> {
        return await UserModel.update(data, {
            where: {
                id,
            },
        });
    }

    public async restoreAdmin(ids: number[]): Promise<TRole | any> {
        const response = await UserModel.restore({
            where: {
                id: ids,
            },
        });
        return response;
    }

    public async deleteAdminPermanant(ids: number[]): Promise<TRole | any> {
        const response = await UserModel.destroy({
            where: {
                id: ids,
            },
            force: true,
        });
        return response;
    }

    public async getPermissionByName(name: string): Promise<TPermission | any> {
        const data = await Permissions.findOne({
            where: {
                name,
            },
        });
        return data;
    }

    public async getPermissionById(id: number): Promise<TPermission | any> {
        const data = await Permissions.findOne({
            where: {
                id,
            },
        });
        return data;
    }

    public async listPermissions(filters: TPermissionFilters): Promise<TPermissionsList | any> {
        const total = await Permissions.count({
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await Permissions.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        return { total, data };
    }
    public async getPermissions(filters: TPermissionFilters): Promise<TPermissionsList | any> {
        const total = await Permissions.count({
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await Permissions.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                name: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        return { total, data };
    }

    public async addPermission(data: TAddPermission): Promise<TPermission | any> {
        const response = await Permissions.create(data);
        return response;
    }

    public async editPermission(id: number, data: TAddPermission): Promise<TPermission | any> {
        const response = await Permissions.update(data, {
            where: {
                id,
            },
        });
        return response;
    }

    public async deletePermission(ids: number[]): Promise<TPermission | any> {
        const response = await Permissions.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }

    public async getPermissionAssigneeByPermissionId(ids: string[]): Promise<any> {
        const data = await UserModel.findAll({
            where: {
                role: ids,
                user_type: '0'
            },
        });
        return data ?? null;
    }

    public async getDeletedFranchisees(filters: TListFilters): Promise<any | null> {
        const total = await UserModel.count({
            where: {
                email: {
                    [Op.like]: `%${filters.search}%`,
                },
                user_type: '1',
                deletedAt: { [Op.not]: null },
            },
            paranoid: false,
        });
        const data = await UserModel.findAll({
            attributes: [
                "id",
                "email",
                "full_name",
                "contact_number",
                "phone_code",
                "address",
                "last_login_at",
                "last_login_ip",
                "createdAt",
                "active",
            ],
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                email: {
                    [Op.like]: `%${filters.search}%`,
                },
                user_type: '1',
                deletedAt: { [Op.not]: null },
            },
            paranoid: false,
        });
        return { total, data };
    }

    public async getFranchisees(filters: TListFilters): Promise<any | null> {
        const total = await UserModel.count({
            where: {
                email: {
                    [Op.like]: `%${filters.search}%`,
                },
                user_type: '1'
            },
        });
        const data = await UserModel.findAll({
            attributes: [
                "id",
                "email",
                "full_name",
                "contact_number",
                "phone_code",
                "address",
                "last_login_at",
                "last_login_ip",
                "createdAt",
                "active",
            ],
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                email: {
                    [Op.like]: `%${filters.search}%`,
                },
                user_type: '1'
            },
        });
        return { total, data };
    }

    public async addFranchisee(data: TAddFranchisee): Promise<TFranchisee | any> {
        return await UserModel.create({ ...data, user_type: '1' });
    }

    public async editFranchisee(
        id: number,
        data: TEditFranchisee
    ): Promise<TFranchisee | any> {
        return await UserModel.update(data, {
            where: {
                id,
            },
        });
    }

    public async getFranchiseeByEmail(email: string): Promise<TFranchisee | any> {
        const data = await UserModel.findOne({
            attributes: [
                "id",
                "email",
                "full_name",
                "contact_number",
                "phone_code",
                "address",
                "last_login_at",
                "last_login_ip",
                "createdAt",
                "active",
            ],
            where: {
                email,
                user_type: '1'
            },
        });
        return data;
    }

    public async getFranchiseeById(id: number): Promise<TFranchisee | any> {
        const data = await UserModel.findOne({
            attributes: [
                "id",
                "email",
                "full_name",
                "contact_number",
                "phone_code",
                "address",
                "last_login_at",
                "last_login_ip",
                "createdAt",
                "active",
            ],
            where: {
                id,
                user_type: '1'
            },
        });
        return data;
    }

    public async deleteFranchisee(ids: number[]): Promise<TRole | any> {
        const response = await UserModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}





// interface by @Nitesh 


// The UserDetails interface tracks user information with fields for creation, update, and deletion logs, including createdBy, createdAt, updatedBy, updatedAt, deletedBy, and deletedAt. The roles field is an array of ADMIN_ROLES enums, accommodating multiple roles per user. The cart interface is a placeholder for future definition. This setup supports a single login endpoint and handles various user types and statuses, ensuring soft deletion and audit trail capabilities.


interface UserDetails {
    id: string;
    createdBy: string;
    createdAt: Date;
    firstName: string;
    lastName: string;
    nameForSearch: string;
    email: string;
    userName: string;
    phoneNumber: string;
    type: USER_TYPE;
    status: USER_STATUS;
    cart: cart[];
    updatedBy: string | null;
    updatedAt: Date | null;
    deletedBy: string | null;
    deletedAt: Date | null;
    roles: null | ADMIN_ROLES;
    profile: Profile | null
    address: Array<Address>
}

interface Address {
    title: string;
    address: string;
    state: string;
    city: string;
    country: string;
    zipCode: string;
    firstName: string;
    lastName: string | null;
    email: string;
    phone: string | null;
    gstin: string | null;
}

interface Profile {
    url: string;
    alt: string;
}


enum ADMIN_ROLES {
    // Super Admin has all access
    SUPER_ADMIN = "SUPER_ADMIN",

    // Product Roles
    PRODUCT_LIST = "PRODUCT_LIST",
    PRODUCT_CREATE = "PRODUCT_CREATE",
    PRODUCT_UPDATE = "PRODUCT_UPDATE",
    PRODUCT_DELETE = "PRODUCT_DELETE",
}

interface cart {

}

enum USER_TYPE {
    B2C = "B2C",
    ADMIN = "admin",
    FRANCHISE = "franchise",
}

enum USER_STATUS {
    "ACTIVE" = "active",
    "INACTIVE" = "inactive",
    "DELETED" = "deleted",
}


