export type TRetortOrderItem = {
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

export type TAddRetortOrderItem = {
  name: string;
  slug: string;
  orderId: number;
  productId: number;
  price: string;
  quantity: number;
};