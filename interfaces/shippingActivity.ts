export interface IShippingHistory {
    id: string;
    orderId: string;
    date?: string;
    activities: IShippingActivity[];
    trackingNumber?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface IShippingHistoryPayload {
    orderId?: string;
    date?: string;
    activities: IShippingActivity[];
    trackingNumber?: string | null;
}

export interface IShippingActivity {
    status: ShippingStatus;
    time: string;
}

export enum ShippingStatus {
    OrderReceived = 'Order Received',
    Processing = 'Processing',
    Shipped = 'Shipped',
    OutForDelivery = 'Out for Delivery',
    Delivered = 'Delivered',
    AttemptedDelivery = 'Attempted Delivery',
    ReturnedToSender = 'Returned to Sender',
    PackageDamaged = 'Package Damaged',
    InTransit = 'In Transit',
    HeldAtPostOffice = 'Held at Post Office',
    DeliveryDelayed = 'Delivery Delayed',
    FailedDelivery = 'Failed Delivery',
    AddressIncorrect = 'Address Incorrect',
    PackageLost = 'Package Lost',
}
