import { ParsedMeta } from "apps/common/models/Base";
import { BaseAddress } from "apps/address/interface/Address";



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
    cart: any[];
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


interface ParsedUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    type: USER_TYPE;
    status: USER_STATUS;
    role: number | null;
}



enum USER_TYPE {
    ADMIN = "admin",
    FRANCHISE = "franchise",
    SUPER_FRANCHISE = "super_franchise",
    AFFILIATE = "affiliate",
    PROSPECT = "prospect",
    GUEST_USER = "guest_user",
}

enum USER_STATUS {
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
    cart: any[];
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

type TUser = {
    id?: number;
    firebaseUid: string;
    createdBy: number;
    password: string;
    firstName: string;
    lastName: string;
    nameForSearch: string;
    profilePhoto: string;
    email: string;
    phoneNumber: string;
    type: string;
    status: string;
    cart: string;
    access_token: string;
    password_token: string;
    referralCode: string;
    referBy: number;
    refresh_token: string;
    updatedBy: number;
    deletedBy: number;
    role: number;
    lastLoginAt: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
};




export { ParsedUser, MetaUser, TUser, USER_STATUS, USER_TYPE };
