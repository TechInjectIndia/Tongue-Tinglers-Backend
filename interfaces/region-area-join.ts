
import type { UpdatedMetaData, BaseModelIdNumber, DeletionMetaData } from ".";

interface IRegionArea extends UpdatedMetaData, BaseModelIdNumber, DeletionMetaData {
    title: string;
}

interface TPayloadArea {
    title: string;
    createdBy: string;
}

interface TAreaList {
    total: number;
    data: IArea[];
}

export {
    IArea,
    TPayloadArea,
    TAreaList,
}
