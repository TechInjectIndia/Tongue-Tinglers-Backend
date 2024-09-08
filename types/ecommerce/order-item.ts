export type TOrderItem = {
  id: number;
  name: string;
  slug: string;
  orderId: number;
  userId: number;
  productId: number;
  isRepeated: number;
  price: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TAddOrderItem = {
  name: string;
  slug: string;
  orderId: number;
  userId: number;
  productId: number;
  price: string;
  quantity: number;
};