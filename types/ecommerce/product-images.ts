const { OrderItem } = require("sequelize");

// ProductCategory type Starts
export type TProductImage = {
  id: number;
  productId: number;
  fileName: string;
  filePath: string;
  originalName: string;
  fileSize: number;
  createdAt: Date;
  updatedAt: Date;
};