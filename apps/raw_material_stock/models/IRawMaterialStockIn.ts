import { BaseModelIdNumber, DeletionMetaData, UpdatedMetaData } from "interfaces";
interface IRawMaterialStockIn extends BaseModelIdNumber, DeletionMetaData, UpdatedMetaData {
    id: number;
    rawMaterialId: number;
    qty: number;
    storageLocationId: number;
    factoryGateId: number;
    supplierId: number;
    unitCost: number;
}


export { IRawMaterialStockIn };