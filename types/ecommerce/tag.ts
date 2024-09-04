const { OrderItem } = require("sequelize");

// Tag type Starts
export type TProductTag = {
  id: number;
  name: string;
  slug: string;
  description: string;
  active: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TEditProductTag = {
  name: string;
  slug: string;
  description: string;
  active: number;
};

export type TAddProductTag = {
  name: string;
  slug: string;
  description: string;
  active: number;
};

export type TProductTagsList = {
  total: number;
  data: TProductTag[];
};

export type TProductTagFilters = {
  offset: number;
  limit: number;
  search?: string;
  sorting?: typeof OrderItem;
  trashOnly?: string;
};
// Tag type Ends