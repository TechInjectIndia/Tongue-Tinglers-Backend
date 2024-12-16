import { UpdatedMetaData, BaseModel, DeletionMetaData } from "../../../../interfaces/index";

export interface ISupplier extends BaseModel, UpdatedMetaData, DeletionMetaData {
    id: number;
    name: string;
    phone: string;
    email: string;
}