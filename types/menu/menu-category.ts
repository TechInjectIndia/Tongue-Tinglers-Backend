const { OrderItem } = require("sequelize");

export type TMenuCategory = {
  id: number;
  name: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TMenuCategorysList = {
  total: number;
  data: TMenuCategory[];
};

export type TMenuCategoryFilters = {
  offset: number;
  limit: number;
  search?: string;
  sorting?: typeof OrderItem;
  trashOnly?: string;
};