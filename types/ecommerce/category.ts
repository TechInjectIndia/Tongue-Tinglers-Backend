const { OrderItem } = require("sequelize");

// ProductCategory type Starts

export interface TProductCategoryFilters {
  offset: number;
  limit: number;
  search?: string;
  sorting?: typeof OrderItem;
  trashOnly?: string;
};

export interface TAddProductCategory {
  name: string;
  slug: string;
  description: string;
  active?: boolean;
};

export interface TProductCategory extends TAddProductCategory, Partial<TProductCategoryFilters> {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  offset?: number;
  limit?: number;
};

// export type TAddProductCategory = {
//   name: string;
//   slug: string;
//   description: string;
//   active: number;
// };

// export type TProductCategorysList = {
//   total: number;
//   data: TProductCategory;
// };


// ProductCategory type Ends
