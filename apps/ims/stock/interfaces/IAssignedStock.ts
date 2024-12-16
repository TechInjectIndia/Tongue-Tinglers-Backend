import { UpdatedMetaData, BaseModel, DeletionMetaData } from "../../../../interfaces/index";

interface IAssignedStock extends BaseModel, UpdatedMetaData, DeletionMetaData {
    readonly id: number;
    stockId: number;
    orderId: number;
    quantity: number;
}

export {
    IAssignedStock,
}

