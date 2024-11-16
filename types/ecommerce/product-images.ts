const { OrderItem } = require("sequelize");

// ProductCategory type Starts
export type TProductImage = {
  id: number;
  productId: number;
  fileName: string;
  filePath: string;
  originalName: string;
  caption: string;
  fileSize: number;
  isMainImage: boolean;
  createdAt: Date;
  updatedAt: Date;
};