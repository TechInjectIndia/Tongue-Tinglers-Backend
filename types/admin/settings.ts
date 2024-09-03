const { OrderItem } = require("sequelize");

// Settings type Starts
export type TSettings = {
  id: number;
  key: string;
  value?: string;
  type: string;
  category: string;
  environment: string;
  active: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TEditSettings = {
  key: string;
  value?: string;
  type: string;
  category: string;
  environment: string;
};
