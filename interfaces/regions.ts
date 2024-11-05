
import type { UpdatedMetaData, BaseModel, DeletionMetaData } from "../interfaces";

interface IRegion extends UpdatedMetaData, BaseModel, DeletionMetaData {
    id: string;
    name: string;
    description?: string;
    code?: string;
    isActive: boolean;
}

interface TPayloadRegion {
    name: string;
    description?: string;
    code?: string;
    isActive: boolean;
    createdBy: string;
}

interface TRegionList {
    total: number;
    data: IRegion[];
}

export {
    IRegion,
    TPayloadRegion,
    TRegionList,
}