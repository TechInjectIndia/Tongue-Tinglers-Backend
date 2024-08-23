const { OrderItem } = require("sequelize");

// ProductCategory type Starts
export type TProductCategory = {
  id: number;
  name: string;
  description: string;
  active: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TAddProductCategory = {
  name: string;
  slug: string;
  description: string;
  active: number;
};

export type TProductCategorysList = {
  total: number;
  data: TProductCategory;
};

export type TProductCategoryFilters = {
  offset: number;
  limit: number;
  search?: string;
  sorting?: typeof OrderItem;
  trashOnly?: string;
};
// ProductCategory type Ends