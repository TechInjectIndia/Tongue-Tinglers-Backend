const { OrderItem } = require("sequelize");

// ProductTag type Starts
export type TTagImage = {
  id: number;
  tagId: number;
  fileName: string;
  filePath: string;
  originalName: string;
  fileSize: number;
  createdAt: Date;
  updatedAt: Date;
};