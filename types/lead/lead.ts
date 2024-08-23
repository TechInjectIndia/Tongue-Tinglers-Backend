const { OrderItem } = require("sequelize");

// Lead type Starts
export type TLead = {
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

export type TAddLead = {
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

export type TLeadsList = {
  total: number;
  data: TLead;
};

export type TLeadFilters = {
  offset: number;
  limit: number;
  search?: string;
  sorting?: typeof OrderItem;
  trashOnly?: string;
};
// Lead type Ends