import { BaseMeta } from "apps/common/models/Base";



interface IArea extends BaseMeta {
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