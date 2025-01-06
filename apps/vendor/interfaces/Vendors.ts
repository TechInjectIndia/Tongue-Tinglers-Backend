// interfaces/IVendorAttributes.ts
const { OrderItem } = require("sequelize");

interface IVendorAttributes {
    id: number;
    company_name: string;
    gst_number: string;
    company_address: string;
    company_email: string;
    company_phone: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface TPayloadVendor {
    company_name: string;
    gst_number: string;
    company_address: string;
    company_email: string;
    company_phone: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
}

interface TVendorList {
    total: number;               // Total number of vendors matching the filter criteria
    data: IVendorAttributes[];             // Array of vendors
}

interface TVendorFilters {
    search?: string;
    sorting?: typeof OrderItem;
    trashOnly?: string;
}
export {
    IVendorAttributes,
    TVendorFilters,
    TPayloadVendor,
    TVendorList
}
