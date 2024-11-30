const { OrderItem } = require("sequelize");

export type TRetortOrder = {
  id: number;
  userId: number;
  trackingNumber: string;
  shippingAddresses: string;
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
  userId: number;
  trackingNumber: string;
  shippingAddresses: string;
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