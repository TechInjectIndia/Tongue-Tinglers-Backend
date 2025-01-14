import { BaseMeta } from "apps/common/models/Base";

interface ICreateRawMaterialHold {
    rawMaterialId: number;
    purchaseInvoiceId: number;
    totalQty: number;
    holdQty: number;
    holdReason: string | null;
    holdById: number | null;
    createdBy: number;
}

interface IRawMaterialHold extends ICreateRawMaterialHold, BaseMeta {

}

interface IRawMaterialHoldResponse extends IRawMaterialHold {
    rawMaterial: string;
    invoiceNumber: string;
    holdBy: string;
}



export { IRawMaterialHold, ICreateRawMaterialHold, IRawMaterialHoldResponse };