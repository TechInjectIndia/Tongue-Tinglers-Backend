import { ParsedProductOptions } from "apps/product/interface/ProductOptions";

export interface Invoice {
    invoiceId: number;
    orderItems: InvoiceOrderItem[];
    billingDetails: BillingDetails;
    shippingDetails: BillingDetails;
    companyDetails: CompanyDetails;
    tax: number;
    discount: number | null;
    subTotal: number;
    grandTotal: number;
    date: string;
    shippingCharge: number;
    contact: string;
    paymentType: string;
    // rewardPoints: number;
    couponCode: string | null;
    paymentId: string | null;
    // note: string | null;
}

export interface BillingDetails {
    name: string;
    address: InvoiceAddress;
    contact: string;
    email: string;
}

interface CompanyDetails {
    companyName: string;
    companyAddress: InvoiceAddress;
    returnAddress: InvoiceAddress | null;
}

export interface InvoiceAddress {
    line: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
}

export interface InvoiceOrderItem {
    name: string;
    // model: string;
    qty: number;
    unitPrice: number;
    selectedOption: ParsedProductOptions;
    // selectedOption: Record<string, string | number | boolean>;
}
