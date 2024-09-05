const { OrderItem } = require("sequelize");

// ProductCategory type Starts
export type TProductTagLink = {
  id: number;
  productId: number;
  tagId: number;
  createdAt: Date;
  updatedAt: Date;
};