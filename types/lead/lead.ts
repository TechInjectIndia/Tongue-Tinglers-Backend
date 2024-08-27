const { OrderItem } = require("sequelize");

// Lead type Starts
export type TLeadStatus = {
  status: number,
};

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

export type TAssignLead = {
  assigned_to: number;
  assigned_by: number;
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