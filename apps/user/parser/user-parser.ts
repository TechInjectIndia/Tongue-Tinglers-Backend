import {MetaUser, ParsedUser} from "../interface/user";

export const parseUserToMetaUser = (data: ParsedUser): MetaUser => {
    return {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,

    };
}



