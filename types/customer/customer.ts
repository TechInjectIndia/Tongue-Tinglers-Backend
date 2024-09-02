const { OrderItem } = require("sequelize");

export type TCustomerLogin = {
  email: string;
  password?: string;
};

export type TUpdateCustomerToken = {
  user_id: number;
  refresh_token: string;
  lastLoginAt: Date;
  lastLoginIp: string;
};

export type TUpdateCustomerPassword = {
  user_id: string;
  password: string;
};
