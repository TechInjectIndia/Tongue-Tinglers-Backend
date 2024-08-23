const { OrderItem } = require("sequelize");

// Franchisee type Starts
export type TFranchiseeLogin = {
  email: string;
  password?: string;
};

export type TFranchisee = {
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

export type TAddFranchisee = {
  email: string;
  password: string;
  full_name: string;
  contact_number: string;
  phone_code: string;
  role: number;
  address: string;
  active: number;
};

export type TEditFranchisee = {
  email?: string;
  password?: string;
  full_name?: string;
  contact_number?: string;
  phone_code?: string;
  role: number;
  address?: string;
  active: number;
};


export type TFranchiseesList = {
  total: number;
  data: TFranchisee;
};

export type TEditFranchiseeProfile = {
  full_name: string;
  contact_number: string;
  phone_code: string;
  address: string;
};
// Franchisee type Ends

export type TUpdateFranchiseeToken = {
  user_id: number;
  refresh_token: string;
  last_login_at: Date;
  last_login_ip: string;
};

export type TUpdateFranchiseeProfile = {
  user_id: string;
  full_name: string;
  contact_number: string;
  phone_code: number;
  address: string;
};

export type TUpdateFranchiseePassword = {
  user_id: string;
  password: string;
};
