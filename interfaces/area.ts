
import type { UpdatedMetaData, BaseModelIdNumber, DeletionMetaData } from ".";

interface IArea extends UpdatedMetaData, BaseModelIdNumber, DeletionMetaData {
    title: string;
}

interface TPayloadArea {
    title: string;
    createdBy: number;
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