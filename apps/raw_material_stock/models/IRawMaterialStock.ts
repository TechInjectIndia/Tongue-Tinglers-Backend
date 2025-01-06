import { BaseModelIdNumber, DeletionMetaData, UpdatedMetaData } from "interfaces";
interface ICreateRawMaterialStock {
    rawMaterialId: number;
    totalStock: number;
    assignedStock: number;
}

interface IRawMaterialStock extends ICreateRawMaterialStock, BaseModelIdNumber, DeletionMetaData, UpdatedMetaData {
    id: number;
}

interface IRawMaterialStockDetails extends IRawMaterialStock {
    rawMaterialName: string;
}

interface IReceiveRawMaterialStock extends BaseModelIdNumber, DeletionMetaData, UpdatedMetaData {
    rawMaterialId: number;
    qty: number;
    supplierId: number;
    unitCost: number;
    storageLocationId: number;
    factoryGateId: number;
}

interface IRawMaterialStockInDetails extends BaseModelIdNumber, DeletionMetaData, UpdatedMetaData {
    rawMaterialId: number;
    rawMaterial: string;
    qty: number;
    supplierId: number;
    supplier: string;
    unitCost: number;
    storageLocationId: number;
    storageLocation: string;
    factoryGateId: number;
    factoryGate: string;
}



export { IRawMaterialStock, ICreateRawMaterialStock, IReceiveRawMaterialStock, IRawMaterialStockDetails, IRawMaterialStockInDetails };