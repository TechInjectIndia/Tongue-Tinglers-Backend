const { OrderItem } = require("sequelize");

export type TLeadStatus = {
  status: number,
};

export type TLead = {
  id: number;
  firstName: string,
  lastName: string,
  city: string,
  state: string,
  zip_code: string,
  country: string,
  phoneNumber: string,
  email: string,
  address: string,
  additional_info: string,
  source: number,
  follow_date: Date,
  status: number,
  createdBy: number,
  assignedTo: number,
  updatedBy: string;
  deletedBy: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export type TEditLead = {
  firstName: string,
  lastName: string,
  city: string,
  state: string,
  zip_code: string,
  country: string,
  phoneNumber: string,
  email: string,
  address: string,
  additional_info: string,
  source: number,
  follow_date: Date,
  status: number,
};

export type TAssignLead = {
  assignedTo: number;
  assignedBy: number;
};

export type TAddLead = {
  firstName: string,
  lastName: string,
  city: string,
  state: string,
  zip_code: string,
  country: string,
  phoneNumber: string,
  email: string,
  address: string,
  additional_info: string,
  source: number,
  follow_date: Date,
  status: number,
};

export type TLeadsList = {
  total: number;
  data: TLead[];
};