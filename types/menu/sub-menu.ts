const { OrderItem } = require("sequelize");

export type TSubMenu = {
  id: number;
  name: string;
  status: string;
  updatedBy: string;
  deletedBy: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

export type TSubMenusList = {
  total: number;
  data: TSubMenu;
};

export type TSubMenuFilters = {
  offset: number;
  limit: number;
  search?: string;
  sorting?: typeof OrderItem;
  trashOnly?: string;
};