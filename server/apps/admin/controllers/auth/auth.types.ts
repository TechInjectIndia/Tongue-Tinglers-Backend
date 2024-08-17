export type TAdmin = {
    id: number;
    email: string;
    password: string;
    full_name: string;
    contact_number: string;
    phone_code: string;
    role: number;
    profile_photo: string;
    address: string;
    last_login_at: Date;
    last_login_ip: string;
    refresh_token: string;
    createdAt: Date;
    updatedAt: Date;
};

export type TUpdateAdminToken = {
    user_id: number;
    refresh_token: string;
    last_login_at: Date;
    last_login_ip: string;
};

export type TUpdateAdminProfile = {
    user_id: string;
    full_name: string;
    contact_number: string;
    phone_code: number;
    address: string;
};

export type TUpdateAdminPassword = {
    user_id: string;
    password: string;
};
