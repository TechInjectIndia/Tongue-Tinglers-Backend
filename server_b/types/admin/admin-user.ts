export type TRole = {
  id: number;
  name: string;
  active: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TAddEditRole = {
  name: string;
  active: number;
};

export type TAdmin = {
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

export type TAddEditAdmin = {
  email: string;
  password: string;
  full_name: string;
  contact_number: string;
  phone_code: string;
  role: number;
  address: string;
  active: number;
};

export type TRolesList = {
  total: number;
  data: TRole;
};

export type TAdminsList = {
  total: number;
  data: TAdmin;
};

export type TUpdateAdminToken = {
  user_id: number;
  refresh_token: string;
  last_login_at: Date;
  last_login_ip: string;
};
