// Base address properties to avoid repetition
import { BaseMeta } from "../database/schema/base/Base";

export interface IBaseAddress {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

// Complete address type, extending the base address
export interface IAddress extends IBaseAddress, BaseMeta {

}

// Payload type for creating/updating an address (no ID or timestamps)
export interface IPayloadAddress extends IBaseAddress {
}


// Address list type for paginated data
export interface IAddressList {
    total: number;
    data: IAddress[];
}

// Address filters type for search and sorting
export interface IAddressFilters {
    offset: number;
    limit: number;
    search?: string;
    trashOnly?: boolean; // Changed to boolean for clarity
}
