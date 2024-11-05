// interfaces/ICartItemAttributes.ts

export interface ICartItemAttributes {
    id: string; // Unique identifier for the cart item
    cart_id: string; // ID of the cart to which this item belongs
    productId: string; // ID of the product associated with this cart item
    quantity: number; // Quantity of the product
    price: number; // Price of the product
    subtotal: number; // Calculated subtotal for this item (quantity * price)
    createdAt?: Date; // Date the cart item was created
    updatedAt?: Date; // Date the cart item was last updated
}

// Interface for cart attributes
export interface ICartAttributes {
    id: string; // Unique identifier for the cart
    userId: string; // ID of the user associated with the cart
    items?: TCartItem[]; // Array of items in the cart
    totalAmount: number; // Total amount for the cart
    createdAt: Date; // Date the cart was created
    updatedAt: Date; // Date the cart was last updated
}

// Structure for the list of carts
export type TCartList = {
    total: number; // Total number of carts
    data: ICartAttributes[]; // Array of cart attributes
};

// Structure for a single cart item
export type TCartItem = {
    productId: string; // ID of the product
    quantity: number; // Quantity of the product
    price: number; // Price of the product
    subtotal: number; // Calculated subtotal for this item (quantity * price)
};

// Payload structure for creating or updating a cart
export type TPayloadCart = {
    userId: string; // ID of the user associated with the cart
    items: TCartItem[]; // Array of items in the cart
    totalAmount: number; // Total cost of the cart
};