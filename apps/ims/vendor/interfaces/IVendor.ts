import { UpdatedMetaData, BaseModel, DeletionMetaData } from "../../../../interfaces/index";

export interface IVendor extends BaseModel, UpdatedMetaData, DeletionMetaData {
    id: number;
    name: string;
    phone: string;
    email: string;
}