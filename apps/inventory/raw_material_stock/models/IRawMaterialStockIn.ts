import { BaseMeta } from "apps/common/models/Base";



interface ICreateRawMaterialStockIn {
    rawMaterialId: number;
    qty: number;
    price: number;
    storageLocationId: number | null;
    factoryGateId: number;
    supplierId: number;
    purchaseInvoiceId: number;
    createdBy: number;
}

interface IRawMaterialStockIn extends ICreateRawMaterialStockIn, BaseMeta {

}


export { IRawMaterialStockIn, ICreateRawMaterialStockIn };