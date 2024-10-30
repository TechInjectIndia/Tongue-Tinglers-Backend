const { OrderItem } = require("sequelize");
import { PRODUCTS_TYPE } from '../../interfaces'

// Product type Starts
export type TProduct = {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  total_ratings: number;
  type: PRODUCTS_TYPE;
  ratings: number;
  discount: number;
  sold: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TEditProduct = {
  name: string;
  slug: string;
  description: string;
  price: number;
  total_ratings: number;
  type: PRODUCTS_TYPE;
  ratings: number;
  discount: number;
  sold: number;
  active: boolean;
}

export type TAddProduct = {
  name: string;
  type: PRODUCTS_TYPE;
  description: string;
  price: number;
  active: boolean;
}

export type TProductsList = {
  total: number;
  data: TProduct[];
};

export type TProductFilters = {
  offset: number;
  limit: number;
  search?: string;
  sorting?: typeof OrderItem;
  trashOnly?: string;
};

export type TProductSearch = {
  search?: string;
  sorting?: typeof OrderItem;
};
// Product type Ends