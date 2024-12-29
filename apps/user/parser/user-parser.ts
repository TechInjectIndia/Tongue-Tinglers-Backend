import {ParsedUser} from "../interface/User"

export const parseUserToMetaUser = (data: ParsedUser): ParsedUser => {
    return {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role,
        phoneNumber: data.phoneNumber,
        type: data.type,
        status: data.status
    };
}

