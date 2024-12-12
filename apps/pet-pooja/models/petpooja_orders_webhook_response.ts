interface PetPoojaOrdersWebHookResponse {
    event: PET_POOJA_WEBHOOK_EVENT;
    token: string;
    properties: {
        "Customer": Customer;
        "Discount": Discount[];
        "Order": Order;
        "OrderItem": OrderItem[];
        "Restaurant": Restaurant;
        "Tax": Tax[];
    };
}

enum PET_POOJA_WEBHOOK_EVENT {
    ORDER_DETAILS = "orderdetails",
};

interface Customer {
    name: string;
    phone: string;
    address: string;
};

interface Discount {
    amount: number;
    rate: number;
    title: string;
    type: string;
}

interface Order {
    comment: string;
    core_total: number;
    created_on: string;
    delivery_charges: number;
    discount_total: number;
    orderID: number;
    order_from: string;
    order_type: PET_POOJA_ORDERS_WEBHOOK_ORDER_TYPE;
    payment_type: PET_POOJA_ORDERS_WEBHOOK_PAYMENT_TYPE;
    status: PET_POOJA_ORDERS_WEBHOOK_STATUS;
    packaging_charge: number;
    service_charge: number;
    tax_total: number;
    total: number;
}

enum PET_POOJA_ORDERS_WEBHOOK_ORDER_TYPE {
    DELIVERY = "Delivery",
}

enum PET_POOJA_ORDERS_WEBHOOK_PAYMENT_TYPE {
    CASH = "Cash",
    ONLINE = "Online",
}

enum PET_POOJA_ORDERS_WEBHOOK_STATUS {
    SUCCESS = "Success",
}

interface OrderItem {
    itemid: number;
    name: string;
    price: number;
    quantity: number;
    addon: OrderItemAddon[];
}

interface OrderItemAddon {
    name: string;
    price: number;
    quantity: number;
}

interface Restaurant {
    restID: string;
}

interface Tax {
    amount: number;
    rate: number;
    title: TAX_TYPE;
}

enum TAX_TYPE {
    CGST = "CGST",
    SGST = "SGST",
}