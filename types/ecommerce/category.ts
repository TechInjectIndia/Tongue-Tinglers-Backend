const { OrderItem } = require("sequelize");
import { ProductsModel } from '../../database/schema'

// ProductCategory type Starts
export interface TProductCategory {
  id: number; // Adjust based on your actual type
  name: string;
  description: string; // Ensure you have this field
  active: boolean; // Ensure you have this field
  slug: string; // Ensure you have this field
  createdAt: Date; // Ensure you have this field
  updatedAt: Date; // Ensure you have this field
  products?: ProductsModel[];
}

export type TEditProductCategory = {
  name: string;
  slug: string;
  description: string;
  active: boolean;
};

export type TAddProductCategory = {
  name: string;
  slug: string;
  description: string;
  active: boolean;
};

export type TProductCategorysList = {
  total: number;
  data: TProductCategory[];
};

export type TProductCategoryFilters = {
  offset: number;
  limit: number;
  search?: string;
  sorting?: typeof OrderItem;
  trashOnly?: string;
};
// ProductCategory type Ends