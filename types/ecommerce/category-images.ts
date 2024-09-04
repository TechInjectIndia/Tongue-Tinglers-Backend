const { OrderItem } = require("sequelize");

// ProductCategory type Starts
export type TCategoryImage = {
  id: number;
  categoryId: number;
  fileName: string;
  filePath: string;
  originalName: string;
  fileSize: number;
  createdAt: Date;
  updatedAt: Date;
};