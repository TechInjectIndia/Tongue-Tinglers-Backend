const { OrderItem } = require("sequelize");


interface BaseAddress {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
}

interface Address extends BaseAddress {
    id: number;
}

export type TAddress = {
    id: number;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    createdAt: Date;
    updatedAt: Date;
};

export type TPayloadAddress = {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
};

export type TPayloadAddressUser = {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    user_id: number;
};

export type TAddressList = {
    total: number;
    data: TAddress[];
};

export type TAddressFilters = {
    offset: number;
    limit: number;
    search?: string;
    sorting?: typeof OrderItem;
    trashOnly?: string;
};


export { BaseAddress, Address };
