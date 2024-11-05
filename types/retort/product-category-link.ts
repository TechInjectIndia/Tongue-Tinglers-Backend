const { OrderItem } = require("sequelize");

// ProductCategory type Starts
export type TRetortProductCategoryLink = {
  id: number;
  productId: number;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TAddRetortProductCategoryLink = {
  productId: number;
  categoryId: number;
};

