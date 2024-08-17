import * as CONSTANTS from "../constants";

const { RESPONSES } = CONSTANTS;
export default (message, data, error = false) => ({
    error: !!error,
    message: message || (error ? RESPONSES.common500 : "Success"),
    data,
});

export const createUserResponse = (user: any) => {
    let userDetails = {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        contact_number: user.contact_number,
        country_code: user.country_code,
        phone_code: user.phone_code,
        status: user.status,
        profile_photo: user.profile_photo,
        address: user.address,
        last_login_at: user.last_login_at,
        last_login_ip: user.last_login_ip,
        onboarding_step: user.onboarding_step,
        email_verified: user.email_verified,
        phone_verified: user.phone_verified,
        created_at: user.createdAt,
        billing_name: user.billing_name,
        billing_country: user.billing_country,
        billing_state: user.billing_state,
        billing_city: user.billing_city ,
        billing_street: user.billing_street,
        billing_zip: user.billing_zip   ,
        billing_tax_number: user.billing_tax_number,
        timezone: user.timezone,
    };
    return userDetails;
};
