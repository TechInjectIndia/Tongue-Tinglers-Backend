const { OrderItem } = require("sequelize");

// Settings type Starts
export type TSettings = {
  id: number;
  email: string;
  password?: string;
  full_name: string;
  contact_number: string;
  phone_code: string;
  role: number;
  Settings_photo: string;
  address: string;
  lastLoginAt: Date;
  lastLoginIp: string;
  refresh_token?: string;
  active: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TEditSettings = {
  full_name?: string;
  contact_number?: string;
  phone_code?: string;
  address?: string;
};
