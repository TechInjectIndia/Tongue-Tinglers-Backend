
import { BaseAddress } from "../types";

export interface cart {
}

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

interface parsedUser {

}

export {
    parsedUser
}
