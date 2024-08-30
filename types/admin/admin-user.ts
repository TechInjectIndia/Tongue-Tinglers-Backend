const { OrderItem } = require("sequelize");

export type TUser = {
  id: number;
  email: string;
  password?: string;
  full_name: string;
  contact_number: string;
  phone_code: string;
  role: number;
  profile_photo: string;
  address: string;
  last_login_at: Date;
  last_login_ip: string;
  refresh_token?: string;
  active: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TAddUser = {
  email: string;
  password: string;
  full_name: string;
  contact_number: string;
  phone_code: string;
  role: number;
  address: string;
  active: number;
};

export type TEditUser = {
  email?: string;
  password?: string;
  full_name?: string;
  contact_number?: string;
  phone_code?: string;
  role: number;
  address?: string;
  active: number;
};


export type TUsersList = {
  total: number;
  data: TUser;
};

export type TEditUserProfile = {
  full_name: string;
  contact_number: string;
  phone_code: string;
  address: string;
};
// User User type Ends

export type TUpdateUserToken = {
  user_id: number;
  refresh_token: string;
  last_login_at: Date;
  last_login_ip: string;
};

export type TUpdateUserProfile = {
  user_id: string;
  full_name: string;
  contact_number: string;
  phone_code: number;
  address: string;
};

export type TUpdateUserPassword = {
  user_id: string;
  password: string;
};