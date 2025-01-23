import {MetaUser, ParsedUser, TUser} from "../interface/user";

export const parseUserToMetaUser = (data: TUser): MetaUser => {
    return {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
    };
}

export const parseUser = (data:any, options?:any): ParsedUser => {
    const userData:ParsedUser =   {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        profilePhoto: data.profilePhoto ? data.profilePhoto : null,
        createdBy: data.createdBy ? parseUserToMetaUser(data.createdBy) : null,
        updatedBy: data.updatedBy ? parseUserToMetaUser(data.updatedBy) : null,
        deletedBy: data.deletedBy ? parseUserToMetaUser(data.deletedBy) : null,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        deletedAt: data.deletedAt,
        type: data.type,
        status: data.status,
        role: data.role
    };
    return userData
}



