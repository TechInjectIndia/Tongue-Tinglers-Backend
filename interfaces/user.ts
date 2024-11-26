export interface cart {}

export enum USER_TYPE {
    SUPER_FRANCHISE = "super_franchise", // Super-admin
    MASTER_FRANCHISE = "master_franchise", // Admin
    FRANCHISE = "franchise", // Normal-franchise
    ADMIN = "admin", // admin
    GUEST_USER = "guest_user",
    PROSPECT = "prospect",
}

export enum USER_STATUS {
    ACTIVE = "active",
    INACTIVE = "inactive",
    DELETED = "deleted",
}

export interface Address {
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
    PAN: string | null;
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
    address: Array<Address>;
}
