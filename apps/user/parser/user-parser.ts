import {MetaUser, ParsedCustomer, ParsedUser} from "../interface/user";

export const parseUserToMetaUser = (data: ParsedUser): MetaUser => {
    return {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,

    };
}

export const parseCustomerDetails = (customerData:any): ParsedCustomer => {
    return {
        id: customerData.id,
        firstName: customerData.firstName,
        lastName: customerData.lastName,
        email: customerData.email,
        phoneNumber: customerData.phoneNumber,
        type: customerData.type,
        status: customerData.status,
        role: customerData.role,
    }
}



