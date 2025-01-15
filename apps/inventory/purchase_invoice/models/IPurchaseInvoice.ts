import { BaseMeta } from "apps/common/models/Base";
import { PURCHASE_INVOICE_STATUS } from "./PurchaseInvoiceMisc";

interface ICreatePurchaseInvoice {
    invoiceNumber: string;
    invoiceDate: Date;
    poNumber: string;
    poDate: Date;
    supplierId: number;
    status: PURCHASE_INVOICE_STATUS;
    purchasedById: number;
    createdBy: number;
}

interface IRawMaterialReceivedItem {
    rawMaterialId: number;
    storageLocationId: number | null;
    totalQty: number;
    price: number;
    rejectedQty: number;
    rejectionReason: string | null;
    rejectedById: number;
    holdQty: number;
    holdReason: string | null;
    holdById: number;
}

interface IPurchaseInvoiceRequest extends ICreatePurchaseInvoice {
    factoryGateId: number;
    rawMaterials: IRawMaterialReceivedItem[];
}


interface IPurchaseInvoice extends ICreatePurchaseInvoice, BaseMeta {

}

interface IPurchaseInvoiceResponse extends IPurchaseInvoice {
    supplier: string;
}


export { IPurchaseInvoice, IPurchaseInvoiceResponse, ICreatePurchaseInvoice, IPurchaseInvoiceRequest };