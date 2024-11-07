export type TOrderItem = {
  id: number;
  orderId: string,
  userId: string,
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
  orderId: string,
  userId: string,
  productId: number,
  productType: string,
  quantity: number,
  price: number,
  subtotal: number,
  isRepeated: number,
};