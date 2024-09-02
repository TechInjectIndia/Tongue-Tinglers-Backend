const { OrderItem } = require("sequelize");

export type TUser = {
  id: number;
  createdBy: string;
  password: string;
  firstName: string;
  lastName: string;
  nameForSearch: string;
  email: string;
  userName: string;
  phoneNumber: string;
  type: string;
  status: string;
  cart: string;
  access_token: string;
  refresh_token: string;
  updatedBy: string;
  deletedBy: string;
  role: number;
  lastLoginAt: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export interface TUserWithPermission extends TUser {
  permissions: any
}

export type TAddUser = {
  password: string;
  firstName: string;
  lastName: string;
  nameForSearch: string;
  email: string;
  userName: string;
  phoneNumber: string;
  role: number;
  active: number;
};

export type TEditUser = {
  firstName: string;
  lastName: string;
  nameForSearch: string;
  email: string;
  userName: string;
  phoneNumber: string;
  role: number;
  active: number;
};


export type TUsersList = {
  total: number;
  data: TUser[];
};

export type TEditUserProfile = {
  firstName: string;
  lastName: string;
  nameForSearch: string;
  userName: string;
  phoneNumber: string;
};

export type TUpdateUserToken = {
  user_id: number;
  refresh_token: string;
  lastLoginAt: Date;
  lastLoginIp: string;
};

export type TUpdateUserProfile = {
  user_id: string;
  firstName: string;
  lastName: string;
  nameForSearch: string;
  userName: string;
  phoneNumber: string;
};

export type TUpdateUserPassword = {
  user_id: string;
  password: string;
};

export type TQueryFilters = {
  offset: number;
  limit: number;
  search?: string;
  sorting?: typeof OrderItem;
  trashOnly?: string;
};
