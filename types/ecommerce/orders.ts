const { OrderItem } = require("sequelize");

export type TOrder = {
  id: number;
  userId: number;
  trackingNumber: string;
  shippingAddress: string;
  paymentMethod: string;
  totalPrice: number;
  orderStatus: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TEditOrder = {
  orderStatus: string;
};

export type TAddOrder = {
  userId: number;
  trackingNumber: string;
  shippingAddress: string;
  paymentMethod: string;
  totalPrice: number;
  isRepeated: number;
  orderStatus: string;
};

export type TOrdersList = {
  total: number;
  data: TOrder[];
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