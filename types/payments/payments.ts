const { OrderItem } = require("sequelize");

// Payments type Starts
export type TPayments = {
  id: number;
  city: string,
  state: string,
  zip_code: string,
  country: string,
  phone_number: string,
  email: string,
  address: string,
  additional_info: string,
  status: number,
  createdAt: Date;
  updatedAt: Date;
};

export type TAddPayments = {
  city: string,
  state: string,
  zip_code: string,
  country: string,
  phone_number: string,
  email: string,
  address: string,
  additional_info: string,
  status: number,
};

export type TPaymentssList = {
  total: number;
  data: TPayments;
};

export type TPaymentsFilters = {
  offset: number;
  limit: number;
  search?: string;
  sorting?: typeof OrderItem;
  trashOnly?: string;
};
// Payments type Ends