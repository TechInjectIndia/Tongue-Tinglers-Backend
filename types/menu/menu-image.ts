const { OrderItem } = require("sequelize");

export type TMenuImage = {
  id: number;
  menuId: number;
  fileName: string;
  filePath: string;
  originalName: string;
  fileSize: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TAddMenuImage = {
  menuId: number;
  fileName: string;
  filePath: string;
  originalName: string;
  fileSize: string;
};

export type TEditMenuImage = {
  menuId: number;
  fileName: string;
  filePath: string;
  originalName: string;
  fileSize: string;
};

export type TMenuImagesList = {
  total: number;
  data: TMenuImage[];
};

export type TMenuImageFilters = {
  offset: number;
  limit: number;
  search?: string;
  sorting?: typeof OrderItem;
  trashOnly?: string;
};