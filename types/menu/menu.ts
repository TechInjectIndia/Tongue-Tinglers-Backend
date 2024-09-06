const { OrderItem } = require("sequelize");

export type TAddMenu = {
  name: string;
  status: string;
};

export type TEditMenu = {
  name: string;
  status: string;
};

export type TMenu = {
  id: number;
  name: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TMenusList = {
  total: number;
  data: TMenu[];
};

export type TMenuFilters = {
  offset: number;
  limit: number;
  search?: string;
  sorting?: typeof OrderItem;
  trashOnly?: string;
};