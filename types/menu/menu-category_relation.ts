const { OrderItem } = require("sequelize");

export type TMenuCategoryRelation = {
  id: number;
  menuId: number;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TMenuCategoryRelationsList = {
  total: number;
  data: TMenuCategoryRelation[];
};

export type TMenuCategoryRelationFilters = {
  offset: number;
  limit: number;
  search?: string;
  sorting?: typeof OrderItem;
  trashOnly?: string;
};