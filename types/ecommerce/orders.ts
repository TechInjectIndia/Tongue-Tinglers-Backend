const { OrderItem } = require("sequelize");

// Order type Starts
export type TOrder = {
  id: number;
  orderId: string;
  userId: number;
  trackingNumber: string;
  orderStatus: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TAddOrder = {
  orderStatus: string;
};

export type TOrdersList = {
  total: number;
  data: TOrder;
};

export type TOrderFilters = {
  offset: number;
  limit: number;
  search?: string;
  sorting?: typeof OrderItem;
  trashOnly?: string;
};
// Order type Ends