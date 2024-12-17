import { ParsedMeta } from "../database/schema/base/Base";
import { BaseAddress } from "../types";

export interface cart {}

export enum USER_TYPE {
    ADMIN = "admin",
    FRANSHISE = "franchise",
    SUPER_FRANSHISE = "super_franchise",
    GUEST = "guest",
    AFFILIATE = "affiliate",
    PROSPECT = "prospect",
    GUEST_USER = "guest_user",
}

export enum USER_STATUS {
    ACTIVE = "active",
    INACTIVE = "inactive",
    DELETED = "deleted",
}

export interface UserInformation {
    id: number;
    createdBy: number;
    createdAt: Date;
    firstName: string;
    lastName: string;
    nameForSearch: string;
    email: string;
    phoneNumber: string;
    type: USER_TYPE;
    status: USER_STATUS;
    cart: cart[];
    updatedBy: number | null;
    updatedAt: Date | null;
    deletedBy: number | null;
    deletedAt: Date | null;
    role: number | null;
    address: Array<BaseAddress>;
}

interface MetaUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

const parseUserToMetaUser = (data: ParsedUser): MetaUser => {
    return { id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email
    };
};
interface ParsedUser extends ParsedMeta {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    type: USER_TYPE;
    status: USER_STATUS;
    role: number | null;
    
}

export { ParsedUser, MetaUser };
