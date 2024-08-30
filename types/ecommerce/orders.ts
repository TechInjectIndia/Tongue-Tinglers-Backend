const { OrderItem } = require("sequelize");

// Order type Starts
export type TOrder = {
  id: number;
  order_id: string;
  user_id: number;
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

export type TOrderStatus = {
  status: number,
};

// Order type Ends