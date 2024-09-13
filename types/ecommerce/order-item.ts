export type TOrderItem = {
  id: number;
  name: string;
  slug: string;
  orderId: number;
  userId: string;
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
  userId: string;
  productId: number;
  price: string;
  quantity: number;
};