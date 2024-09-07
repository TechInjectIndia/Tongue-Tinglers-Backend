const { OrderItem } = require("sequelize");

// RetortProductCategory type Starts
export type TRetortProductImage = {
  id: number;
  productId: number;
  fileName: string;
  filePath: string;
  originalName: string;
  fileSize: number;
  createdAt: Date;
  updatedAt: Date;
};