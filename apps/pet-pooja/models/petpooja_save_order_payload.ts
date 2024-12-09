import { PetPoojaBasePayload } from "./petpooja_base_payload";

interface PetPoojaSaveOrderPayload extends PetPoojaBasePayload {

    orderinfo: {

        "OrderInfo": {
            "Restaurant": {
                "details": Restaurant;
            },
            "Customer": {
                "details": CustomerInfo;
            },
            "Order": {
                "details": OrderInfo;
            },
            "OrderItem": {
                "details": OrderItem[];
            },
            "Tax": {
                "details": TaxItem[];
            },
            "Discount": {
                "details": ItemDiscount[];
            }

        },
        udid?: string;
        device_type: "Web";
    }
}

interface Restaurant {
    res_name: string;
    address: string;
    contact_information: string;
    restID: string;


}
interface CustomerInfo {
    email: string;
    name: string;
    address: string;
    phone: string;
    location: {
        latitude: number;
        longitude: number;
    };
}


interface OrderInfo {
    orderID: string;
    preorder_date: string;
    preorder_time: string;
    service_charge: string;
    sc_tax_amount: string;
    delivery_charges: string;
    dc_tax_amount: string;
    dc_gst_details: OrderGSTDetail[];
    packing_charges: string;
    pc_tax_amount: string;
    pc_gst_details: OrderGSTDetail[];
    order_type: string;
    ondc_bap: string;
    advanced_order: string;
    payment_type: string;
    table_no: string;
    no_of_persons: string;
    discount_total: string;
    tax_total: string;
    discount_type: string;
    total: string;
    description: string;
    created_on: string;
    enable_delivery: number;
    min_prep_time: number;
    callback_url: string;
    collect_cash: string;
    otp: string;
}

interface OrderGSTDetail {
    gst_liable: string;
    amount: string;
}


interface OrderItem {
    id: string;
    name: string;
    gst_liability: string;
    item_tax: {
        id: string;
        name: string;// CGST etc.
        amount: string;
    }[];
    item_discount: string;
    price: string;
    final_price: string;
    quantity: string;
    description: string;
    variation_name: string;
    variation_id: string;
    AddonItem: {
        details: []; //
    };
}

interface TaxItem {
    id: string;
    title: string;
    type: string;
    price: string;
    tax: string;
    restaurant_liable_amt: string;
}

interface ItemDiscount {
    id: string;
    title: string;
    type: string;
    price: string;
}


export { PetPoojaSaveOrderPayload, Restaurant, CustomerInfo, OrderInfo, OrderGSTDetail, OrderItem, TaxItem, ItemDiscount, };