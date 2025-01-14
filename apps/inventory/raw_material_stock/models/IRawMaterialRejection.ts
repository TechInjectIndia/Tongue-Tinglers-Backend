import { BaseMeta } from "apps/common/models/Base";

interface ICreateRawMaterialRejection {
    rawMaterialId: number;
    purchaseInvoiceId: number;
    totalQty: number;
    rejectedQty: number;
    rejectionReason: string | null;
    rejectedById: number | null;
    createdBy: number;
}

interface IRawMaterialRejection extends ICreateRawMaterialRejection, BaseMeta {

}

interface IRawMaterialRejectionResponse extends IRawMaterialRejection {
    rawMaterial: string;
    invoiceNumber: string;
    rejectedBy: string;
}



export { IRawMaterialRejection, ICreateRawMaterialRejection, IRawMaterialRejectionResponse };