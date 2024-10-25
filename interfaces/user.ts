export interface cart {

}

export enum USER_TYPE {
    SUPER_FRANCHISE = "super_franchise", // Super-admin
    MASTER_FRANCHISE = "master_franchise", // Admin
    FRANCHISE = "franchise", // Normal-franchise
    CUSTOMER = "customer", // customer
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
    role: number | null;
    address: Array<Address>
}
