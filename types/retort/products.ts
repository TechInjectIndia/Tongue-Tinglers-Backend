const { OrderItem } = require("sequelize");
import { PRODUCTS_TYPE } from '../../interfaces'

// RetortProduct type Starts
export type TRetortProduct = {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  stock: string;
  total_ratings: number;
  type: PRODUCTS_TYPE;
  ratings: number;
  discount: string;
  sold: string;
  active: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TEditRetortProduct = {
  name: string;
  slug: string;
  description: string;
  price: string;
  stock: string;
  total_ratings: number;
  type: PRODUCTS_TYPE;
  ratings: number;
  discount: string;
  sold: string;
  active: number;
}

export type TAddRetortProduct = {
  name: string;
  type: PRODUCTS_TYPE;
  description: string;
  price: string;
  stock: string;
  active: number;
}

export type TRetortProductsList = {
  total: number;
  data: TRetortProduct[];
};

export type TRetortProductFilters = {
  offset: number;
  limit: number;
  search?: string;
  sorting?: typeof OrderItem;
  trashOnly?: string;
};

export type TRetortProductSearch = {
  search?: string;
  sorting?: typeof OrderItem;
};
// RetortProduct type Ends