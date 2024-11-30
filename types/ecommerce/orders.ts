const { OrderItem } = require("sequelize");
import { ORDER_TYPE } from '../../interfaces';

export type TOrder = {
  id: number;
  userId?: number;
  trackingNumber?: string;
  shippingAddresses?: any;
  paymentMethod?: string;
  paymentId?: string;
  totalPrice?: number;
  orderStatus?: OrderStatus;
  paymentStatus?: string;
  orderType?: ORDER_TYPE;
  createdAt: Date;
  updatedAt: Date;
};

export type TOrderPayload = {
  userId?: number;
  trackingNumber?: string;
  shippingAddresses?: any;
  paymentMethod?: string;
  paymentId?: string;
  totalPrice?: number;
  isRepeated?: number;
  paymentStatus?: string;
  orderStatus?: OrderStatus;
  orderType?: ORDER_TYPE;
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
