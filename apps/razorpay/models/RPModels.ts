interface RPOrderParams {
    amount: number;
    currency: CURRENCY_TYPE;
    receipt: string;
    notes: string[];
}

enum RP_ORDER_STATUS {
    PAID = "paid",
    CREATED = "created",
    ATTEMPTED = "attempted",
}

interface RPCaptureOrderData {
    paymentId: string;
    signature: string;
    orderId: string;
}

// TESTING
// const RP_KEY = 'rzp_test_ySuQmVWk8RLmAP';

const RP_KEY = "rzp_test_bdG6I1brau4bGI";

interface RPOrder {
    id: string;
    amount: number;
    amount_paid: number;
    amount_due: number;
    currency: string;
    receipt: string; // Shrey System Order Id
    offer_id: string;
    status: RP_ORDER_STATUS;
    attempts: number;
    notes: string[];
    created_at: Date;
}

interface RPCallbackDTO {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

interface RPPaymentOptions {
    // Key ID generated from the Dashboard
    key: string;
    // Amount is in currency subunits. Default currency is INR.
    amount: number;
    currency: CURRENCY_TYPE;
    // Company Name
    name: "Tongue tingler";
    description: "Tongue tingler India";
    // Company Logo
    image: "https://www.tonguetingler.com/images/logo/logo.png";
    // Order Id form createOrder Response
    order_id: string;
    // Response Function
    handler: Function;
    // Customer Details
    prefill: {
        name: string;
        email: string;
        contact: string;
    };
    theme: {
        color: "#000000";
    };
    modal?: {
        ondismiss: Function;
    };
}

enum CURRENCY_TYPE {
    INR = "INR",
}

interface RPWPaymentEntity {
    id: string;
    entity: string;
    amount: number;
    currency: string;
    status: "created" | "authorized" | "captured" | "refunded" | "failed"
    order_id: string;
    invoice_id: null | string;
    international: boolean;
    method: string;
    amount_refunded: number;
    refund_status: null | string;
    captured: boolean;
    description: string;
    card_id: null | string;
    bank: string;
    wallet: null | string;
    vpa: null | string;
    email: string;
    contact: string;
    notes: any[]; // You may need to replace any with the actual type if there are specific note types
    fee: number;
    tax: number;
    error_code: null | string;
    error_description: null | string;
    error_source: null | string;
    error_step: null | string;
    error_reason: null | string;
    acquirer_data: {
        bank_transaction_id: string;
    };
    created_at: number;
    reward: null | string;
}

interface RPWOrderEntity {
    id: string;
    entity: string;
    amount: number;
    amount_paid: number;
    amount_due: number;
    currency: string;
    receipt: string;
    offer_id: null | string;
    status: string;
    attempts: number;
    notes: any[]; // You may need to replace any with the actual type if there are specific note types
    created_at: number;
}

interface RPWRefundEntity {
    id: string;
    amount: number;
    batch_id: string | null;
    created_at: number;
    currency: string;
    entity: string;
    notes: any[];
    payment_id: string;
    receipt: string | null;
    speed_processed: string;
    speed_requested: string;
    status: string;
}

interface RPWPayload {
    payment: RPWPaymentEntity | null;
    order: RPWOrderEntity | null;
    refund: RPWRefundEntity | null;
    created_at: string;
}

enum RPW_EVENT_TYPE {
    ORDER_PAID = "order.paid",
    PAYMENT_AUTHORIZED = "payment.authorized",
    PAYMENT_CAPTURED = "payment.captured",
    PAYMENT_FAILED = "payment.failed",
}

interface RPWEventData {
    id: string;
    event: RPW_EVENT_TYPE;
    payload: RPWPayload;
    createdAt: Date;
    isValid: boolean;
    order_id: string | null;
    payment_id: string | null;
}

export {
    type RPOrder,
    type RPOrderParams,
    type RPPaymentOptions,
    CURRENCY_TYPE,
    RP_KEY,
    type RPCallbackDTO,
    type RPWEventData,
    RPW_EVENT_TYPE,
    RPCaptureOrderData,
    RPWPaymentEntity
};
