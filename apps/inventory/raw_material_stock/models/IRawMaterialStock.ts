import { BaseMeta } from "apps/common/models/Base";

interface ICreateRawMaterialStock {
    rawMaterialId: number;
    totalStock: number;
    assignedStock: number;
}

interface IRawMaterialStock extends ICreateRawMaterialStock, BaseMeta {
    id: number;
}

interface IRawMaterialStockDetails extends IRawMaterialStock {
    rawMaterialName: string;
    msq: number;
}

interface IReceiveRawMaterialStock extends BaseMeta {
    rawMaterialId: number;
    qty: number;
    supplierId: number;
    price: number;
    storageLocationId: number | null;
    factoryGateId: number;
    rawMaterials: IRawMaterialReceivedItem[];

}

interface IRawMaterialReceivedItem {

}

interface IRawMaterialStockInDetails extends BaseMeta {
    rawMaterialId: number;
    rawMaterial: string;
    qty: number;
    supplierId: number;
    supplier: string;
    price: number;
    storageLocationId: number | null;
    storageLocation: string | null;
    factoryGateId: number;
    factoryGate: string;
}



export { IRawMaterialStock, ICreateRawMaterialStock, IReceiveRawMaterialStock, IRawMaterialStockDetails, IRawMaterialStockInDetails };