interface CreateOrderParams {
    /**
     * Payment amount in the smallest currency sub-unit (e.g., 29900 for ₹299.00).
     */
    amount: number;

    /**
     * ISO currency code (e.g., "INR", "USD", "JPY").
     */
    currency: string;

    /**
     * Unique receipt number for the order (up to 40 characters).
     */
    receipt?: string;

    /**
     * Key-value pairs for additional metadata (maximum 15 pairs, 256 characters each).
     */
    notes?: Record<string, string>;

    /**
     * Indicates if partial payments are allowed.
     * - `true`: Partial payments are allowed.
     * - `false` (default): Partial payments are not allowed.
     */
    partial_payment?: boolean;
}

interface CreateOrderResponse {
    id: string;
    entity: string;
    amount: number;
    amount_paid: number;
    amount_due: number;
    currency: string;
    receipt: string;
    status: "created" | "attempted" | "paid";
    attempts: number;
    notes: Record<string, string>;
    created_at: number;
}

interface RazorpayErrorResponse {
    error: {
        code: string;
        description: string;
        "source": string,
        "step": string,
        "reason": string,
        "metadata": Record<any, any>,
        "field": string
    };
}

interface PaymentLinkCustomer {
    name: string; // Customer's full name
    contact: string; // Customer's contact number
    email: string; // Customer's email address
}

interface PaymentLinkNotify {
    sms: boolean; // Whether to notify via SMS
    email: boolean; // Whether to notify via Email
}

interface PaymentLinkNotes {
    [key: string]: string; // Optional metadata as key-value pairs
}


interface PaymentLinkPayload {
    amount: number; // Amount in rupees (will be converted to paisa)
    description: string; // Description of the payment
    customer: {
        name: string; // Customer's name
        email: string; // Customer's email address
        contact: string; // Customer's phone number
    };
    notify: {
        sms: boolean; // Whether to notify via SMS
        email: boolean; // Whether to notify via email
    };
}

interface PaymentLinkReminder {
    // Define any necessary fields for reminder (can be expanded if needed)
}

interface RazorpayPaymentLinkResponse {
    accept_partial: boolean;
    amount: number;
    amount_paid: number;
    callback_method: "get" | "post";
    callback_url: string;
    cancelled_at: number;
    created_at: number;
    currency: string;
    customer: PaymentLinkCustomer;
    description: string;
    expire_by: number;
    expired_at: number;
    first_min_partial_amount: number;
    id: string;
    notes: PaymentLinkNotes;
    notify: PaymentLinkNotify;
    payments: any;  // Typically an array or null if no payments are made yet
    reference_id: string;
    reminder_enable: boolean;
    reminders: PaymentLinkReminder[];
    short_url: string;
    status: "created" | "attempted" | "paid" | "expired";
    updated_at: number;
    user_id: string | null; // Optional, may be null
}

export {
    CreateOrderParams,
    CreateOrderResponse,
    RazorpayErrorResponse,
    PaymentLinkPayload,
    RazorpayPaymentLinkResponse,
    PaymentLinkCustomer,
    PaymentLinkNotify,
    PaymentLinkNotes,
    PaymentLinkReminder,
};
