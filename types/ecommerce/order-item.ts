export type TOrderItem = {
  id: number;
  orderId: number,
  userId: number,
  productId: number,
  productType: string,
  quantity: number,
  price: number,
  subtotal: number,
  isRepeated: number,
  createdAt: Date;
  updatedAt: Date;
};

export type TAddOrderItem = {
  orderId: number,
  userId: number,
  productId: number,
  productType: string,
  quantity: number,
  price: number,
  subtotal: number,
  isRepeated: number,
};