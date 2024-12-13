import { RESPONSE_TYPE } from "../constants";
import { TUser } from "../types";

export const sendResponse = (type: string, message: string, data?: any) => {
    return {
        success: type === RESPONSE_TYPE.SUCCESS,
        message: message,
        data: data ?? null,
    };
};

export const createUserResponse = (user: TUser) => {
    let UserInformation = {
        id: user.id,
        createdBy: user.createdBy,
        firstName: user.firstName,
        lastName: user.lastName,
        nameForSearch: user.nameForSearch,
        email: user.email,
        phoneNumber: user.phoneNumber,
        type: user.type,
        status: user.status,
        cart: user.cart,
        access_token: user.access_token,
        refresh_token: user.refresh_token,
        updatedBy: user.updatedBy,
        deletedBy: user.deletedBy,
        role: user.role,
        lastLoginAt: user.lastLoginAt,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
    return UserInformation;
};
