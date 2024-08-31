export interface cart {

}

export enum USER_TYPE {
    CUSTOMER = "customer",
    ADMIN = "admin",
    FRANCHISE = "franchise",
    MASTER_FRANCHISE = "master_franchise",
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
    gstin: string | null;
}

export interface UserDetails {
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
    role: null;
    address: Array<Address>
}
