const { OrderItem } = require("sequelize");

export type TMenuCategory = {
  id: number;
  name: string;
  status: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TPayloadMenuCategory = {
  name: string;
  status: string;
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