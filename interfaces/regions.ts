
import type { UpdatedMetaData, BaseModel, DeletionMetaData, BaseModelIdNumber } from "../interfaces";

interface IRegion extends UpdatedMetaData, BaseModelIdNumber, DeletionMetaData {
    title: string;
    area: number[] | null;
}

interface TPayloadRegion {
    title: string;
    area: number[] | null;
    createdBy?: string;
    updatedBy?: string;
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