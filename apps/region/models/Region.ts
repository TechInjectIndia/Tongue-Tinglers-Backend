import { BaseMeta } from "apps/common/models/ApiResponse";


import type {
    UpdatedMetaData,
    BaseModel,
    DeletionMetaData,
} from "./index";

interface IRegion extends UpdatedMetaData, BaseModel, DeletionMetaData {
    title: string;
    area?: number[];
}

interface TPayloadRegion {
    title: string;
    area?: number[] | null;
    createdBy?: number;
    updatedBy?: number;
}

interface TRegionList {
    total: number;
    data: IRegion[];
}

interface TPayloadRegionArea {
    regionId: number;
    areaId: number;
}


interface parsedRegion {

}

export {
    IRegion,
    TPayloadRegion,
    TRegionList,
    parsedRegion
}