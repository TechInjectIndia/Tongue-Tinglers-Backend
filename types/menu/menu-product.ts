const { OrderItem } = require("sequelize");

export type TMenuProduct = {
  id: number;
  name: string;
  categoryId: number;
  slug: string;
  description: string;
  images: string;
  price: number;
  active: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TPayloadMenuProduct = {
  name: string;
  slug: string;
  description: string;
  images: string;
  price: number;
  active: string;
};

export type TMenuProductsList = {
  total: number;
  data: TMenuProduct[];
};

export type TMenuProductFilters = {
  offset: number;
  limit: number;
  search?: string;
  sorting?: typeof OrderItem;
  trashOnly?: string;
};