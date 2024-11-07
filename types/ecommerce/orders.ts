const { OrderItem } = require("sequelize");

export type TOrder = {
  id: string;
  userId: string;
  trackingNumber: string;
  shippingAddress: string;
  paymentMethod: string;
  totalPrice: number;
  orderStatus: string;
  orderType: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TEditOrder = {
  orderStatus: string;
  orderType?: string;
};

export type TAddOrder = {
  userId: string;
  trackingNumber: string;
  shippingAddress: string;
  paymentMethod: string;
  totalPrice: number;
  isRepeated: number;
  orderStatus: string;
  orderType: string;
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