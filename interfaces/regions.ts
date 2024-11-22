
import type { UpdatedMetaData, BaseModel, DeletionMetaData } from "../interfaces";

interface IRegion extends UpdatedMetaData, BaseModel, DeletionMetaData {
    title: string;
    area: number[] | null;
}

interface TPayloadRegion {
    title: string;
    area: number[] | null;
    createdBy?: number;
    updatedBy?: number;
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