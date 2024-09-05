const { OrderItem } = require("sequelize");

export type TMenuCategoryImage = {
  id: number;
  categoryId: number;
  fileName: string;
  filePath: string;
  originalName: string;
  fileSize: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TMenuCategoryImagesList = {
  total: number;
  data: TMenuCategoryImage;
};

export type TMenuCategoryImageFilters = {
  offset: number;
  limit: number;
  search?: string;
  sorting?: typeof OrderItem;
  trashOnly?: string;
};