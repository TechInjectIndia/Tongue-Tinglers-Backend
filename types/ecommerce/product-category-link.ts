const { OrderItem } = require("sequelize");

// ProductCategory type Starts
export type TProductCategoryLink = {
  id: number;
  productId: number;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
};