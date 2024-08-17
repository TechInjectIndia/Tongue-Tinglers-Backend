const { OrderItem } = require("sequelize");

export type TRole = {
  id: number;
  name: string;
  active: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TAddRole = {
  name: string;
  active: number;
};

export type TRoleFilters = {
  offset: number;
  limit: number;
  search?: string;
  sorting?: typeof OrderItem;
  trashOnly?: string;
};

export type TListFilters = {
  offset: number;
  limit: number;
  search?: string;
  sorting?: typeof OrderItem;
  trashOnly?: string;
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

export type TAddAdmin = {
  email: string;
  password: string;
  full_name: string;
  contact_number: string;
  phone_code: string;
  role: number;
  address: string;
  active: number;
};

export type TEditAdmin = {
  email?: string;
  password?: string;
  full_name?: string;
  contact_number?: string;
  phone_code?: string;
  role: number;
  address?: string;
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

export type TEditAdminProfile = {
  full_name: string;
  contact_number: string;
  phone_code: string;
  address: string;
};
