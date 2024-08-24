const { OrderItem } = require("sequelize");

// Menu type Starts
export type TMenu = {
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

export type TAddMenu = {
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

export type TMenusList = {
  total: number;
  data: TMenu;
};

export type TMenuFilters = {
  offset: number;
  limit: number;
  search?: string;
  sorting?: typeof OrderItem;
  trashOnly?: string;
};
// Menu type Ends