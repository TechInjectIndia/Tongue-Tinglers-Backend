const { OrderItem } = require("sequelize");

// Product type Starts
export type TProduct = {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: string;
  active: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TAddProduct = {
  data: {
    name: string;
    type: string;
    description: string;
    price: string;
    stock: string;
    active: number;
  };
}

export type TProductsList = {
  total: number;
  data: TProduct;
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