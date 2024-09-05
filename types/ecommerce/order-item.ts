export type TOrderItem = {
  id: number;
  name: string;
  slug: string;
  orderId: number;
  productId: number;
  price: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TAddOrderItem = {
  name: string;
  slug: string;
  orderId: number;
  productId: number;
  price: string;
  quantity: number;
};