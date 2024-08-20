import { RESPONSE_TYPE } from "../constants";
import { TAdmin } from "../types";

export const sendResponse = (type: string, message: string, data?: any) => {
    return {
        success: type === RESPONSE_TYPE.SUCCESS,
        message: message,
        data: data ?? null,
    };
};

export const createAdminUserResponse = (user: TAdmin) => {
    let userDetails = {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        contact_number: user.contact_number,
        phone_code: user.phone_code,
        role: user.role,
        profile_photo: user.profile_photo,
        address: user.address,
        last_login_at: user.last_login_at,
        created_at: user.createdAt,
    };
    return userDetails;
};
