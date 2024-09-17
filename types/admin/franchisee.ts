const { OrderItem } = require("sequelize");

export type TFranchise = {
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

export interface TFranchiseWithPermission extends TFranchise {
  permissions: any
}

export type TAddFranchise = {
  password: string;
  firstName: string;
  lastName: string;
  nameForSearch: string;
  email: string;
  userName: string;
  phoneNumber: string;
  firebaseUid: string;
  createdBy: string;
  role: number;
};

export type TConvertLeadToFranchise = {
  firstName: string;
  lastName: string;
  nameForSearch: string;
  email: string;
  userName: string;
  phoneNumber: string;
};

export type TEditFranchise = {
  firstName: string;
  lastName: string;
  nameForSearch: string;
  email: string;
  userName: string;
  phoneNumber: string;
  role: number;
};


export type TFranchiseesList = {
  total: number;
  data: TFranchise[];
};

export type TEditFranchiseProfile = {
  firstName: string;
  lastName: string;
  nameForSearch: string;
  userName: string;
  phoneNumber: string;
};

export type TUpdateFranchiseToken = {
  user_id: string;
  refresh_token: string;
  lastLoginAt: Date;
  lastLoginIp: string;
};

export type TUpdateFranchiseProfile = {
  user_id: string;
  firstName: string;
  lastName: string;
  nameForSearch: string;
  userName: string;
  phoneNumber: string;
};

export type TUpdateFranchisePassword = {
  user_id: string;
  password: string;
};