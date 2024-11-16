
import type { UpdatedMetaData, BaseModelIdNumber, DeletionMetaData } from "../interfaces";

interface IRegion extends UpdatedMetaData, BaseModelIdNumber, DeletionMetaData {
    title: string;
    area: number[];
}

interface TPayloadRegion {
    title: string;
    area: number[];
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