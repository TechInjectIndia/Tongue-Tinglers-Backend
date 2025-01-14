import { BaseMeta } from "apps/common/models/Base";
import { DEBIT_NOTE_STATUS } from "./DebitNoteMisc";


interface ICreateDebitNote {
    purchaseInvoiceId: number;
    rawMaterialId: number;
    qty: number;
    actualPrice: number;
    purchasedPrice: number;
    createdBy: number;
}

interface IMarkDebitNotePaid {
    purchaseInvoiceId: number;
    updatedId: number;
    note: string | null;
}

interface IDebitNote extends ICreateDebitNote, BaseMeta {
    note: string | null;
    status: DEBIT_NOTE_STATUS;

}

interface IDebitNoteResponse {
    id: number;
    supplier: string;
    rawMaterial: string;
    qty: number;
    purchaseInvoiceId: number;
    purchaseInvoice: string;
    purchaseInvoiceDate: Date;
    actualPrice: number;
    purchasedPrice: number;
    debitAmount: number;
    status: DEBIT_NOTE_STATUS;
}

interface IDebitNoteOverviewResponse {
    supplier: string;
    purchaseInvoiceId: number;
    purchaseInvoice: string;
    purchaseInvoiceDate: Date;
    debitAmount: number;
}

export { IDebitNote, ICreateDebitNote, IDebitNoteResponse, IMarkDebitNotePaid, IDebitNoteOverviewResponse };