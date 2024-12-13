import { UpdatedMetaData, BaseModel, DeletionMetaData } from "../../../../interfaces/index";

interface IStock extends BaseModel, UpdatedMetaData, DeletionMetaData {
    readonly id: number;
    sku: string;
    supplierId: number;
    minimumStockQuantity: number;
    totalQuantity: number;
    assignedQuantity: number;
}

export {
    IStock,
}
