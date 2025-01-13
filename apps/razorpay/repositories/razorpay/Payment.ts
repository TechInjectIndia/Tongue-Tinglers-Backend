import { RPWPaymentEntity } from "apps/razorpay/models/RPModels";

export interface PaymentOrderInfo {
    orderId: string;
    amount: number;
    originalObj: RPWPaymentEntity ;
}

/**
 * tokenId in India means RPOrder Id and in UK its tokenId
 */
export interface BasePayment extends PaymentOrderInfo {
    mode: PAYMENT_MODE;
    tokenId: string;
    transactionId: string;
    paymentLink: string | null;
    status: PaymentStatus | PaymentLinkStatus;
    createdAt: Date;
    updatedAt: Date;
    fee: number;
    feeCurrency: string;
    uid: number;
    username: string;
    email: string;
}

export interface Payment extends BasePayment {
    originalObj: RPWPaymentEntity;
}

export interface Refund extends BasePayment {
    mode: PAYMENT_MODE.REFUND;
    returnRequestId: string | null;
}

export enum PaymentStatus {
    COMPLETED = "COMPLETED",
    // The funds for this captured payment were credited to the payee's PayPal account.
    DECLINED = "DECLINED",
    // The funds could not be captured.
    PARTIALLY_REFUNDED = "PARTIALLY_REFUNDED",
    // An amount less than this captured payment's amount was partially refunded to the payer.
    PENDING = "PENDING",
    // The funds for this captured payment was not yet credited to the payee's PayPal account. For more information, see
    // status.details.
    REFUNDED = "REFUNDED",
    // An amount greater than or equal to this captured payment's amount was refunded to the payer.
    FAILED = "FAILED",
    // There was an error while capturing payment.
}

export enum PaymentLinkStatus {
    CREATED = "CREATED",
    // The order was created with the specified context.
    SAVED = "SAVED",
    // The order was saved and persisted. The order status continues to be in progress until a capture is made with
    // final_capture = true for all purchase units within the order.
    APPROVED = "APPROVED",
    // The customer approved the payment through the PayPal wallet or another form of guest or unbranded payment. For
    // example, a card, bank account, or so on.
    VOIDED = "VOIDED",
    // All purchase units in the order are voided.
    COMPLETED = "COMPLETED",
    // The payment was authorized or the authorized payment was captured for the order.
    PAYER_ACTION_REQUIRED = "PAYER_ACTION_REQUIRED",
    // The order requires an action from the payer (e.g. 3DS authentication). Redirect the payer to the
    // "rel":"payer-action" HATEOAS link returned as part of the response prior to authorizing or capturing the order.
}

export enum PAYMENT_MODE {
    LINK = "LINK",
    ON_PAGE = "WEBSITE",
    REFUND = "REFUND",
}
