import { CURRENCY_TYPE } from "./RPModels";

interface PaymentPayload {
    orderId: string;
    // type: PAYMENT_GATEWAY;
    currency: CURRENCY_TYPE;
    amount: number;
}

export { PaymentPayload };
