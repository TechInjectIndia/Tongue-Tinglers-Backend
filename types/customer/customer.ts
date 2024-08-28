const { OrderItem } = require("sequelize");

export type TCustomerLogin = {
  email: string;
  password?: string;
};

export type TUpdateCustomerToken = {
  user_id: number;
  refresh_token: string;
  last_login_at: Date;
  last_login_ip: string;
};

export type TUpdateCustomerPassword = {
  user_id: string;
  password: string;
};
