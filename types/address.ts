const { OrderItem } = require("sequelize");

export type TAddress = {
  id: number;
  user_id: number;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TAddAddress = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type TEditAddress = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type TAddresssList = {
  total: number;
  data: TAddress[];
};

export type TAddressFilters = {
  offset: number;
  limit: number;
  search?: string;
  sorting?: typeof OrderItem;
  trashOnly?: string;
};