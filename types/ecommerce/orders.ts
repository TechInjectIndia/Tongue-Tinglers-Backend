const { OrderItem } = require("sequelize");

export type TOrder = {
  id: string;
  userId: string;
  trackingNumber: string;
  shippingAddress: any;
  paymentMethod: string;
  paymentId: string;
  totalPrice: number;
  orderStatus: OrderStatus;
  paymentStatus: string;
  orderType: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TOrderPayload = {
  userId?: string;
  trackingNumber?: string;
  shippingAddress?: any;
  paymentMethod?: string;
  paymentId?: string;
  totalPrice?: number;
  isRepeated?: number;
  paymentStatus?: string;
  orderStatus?: OrderStatus;
  orderType?: string;
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

export enum OrderStatus {
  PROCESSED = 'Processed',
  PENDING = 'Pending',
  CANCELED = 'Canceled',
}
