const { OrderItem } = require("sequelize");

export type TRetortOrder = {
  id: number;
  userId: string;
  trackingNumber: string;
  shippingAddress: string;
  paymentMethod: string;
  totalPrice: number;
  orderStatus: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TEditRetortOrder = {
  orderStatus: string;
};

export type TAddRetortOrder = {
  userId: string;
  trackingNumber: string;
  shippingAddress: string;
  paymentMethod: string;
  totalPrice: number;
  orderStatus: string;
};

export type TRetortOrdersList = {
  total: number;
  data: TRetortOrder[];
};

export type TRetortOrderFilters = {
  offset: number;
  limit: number;
  search?: string;
  sorting?: typeof OrderItem;
  trashOnly?: string;
};

export type TRetortOrderStatus = {
  status: number,
};