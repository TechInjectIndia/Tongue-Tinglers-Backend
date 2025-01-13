import { BaseMeta } from "apps/common/models/Base";
import {IArea} from "../../area/interface/Area";


interface IRegion extends BaseMeta {
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

export interface ParsedRegion extends IRegion{
    areas: IArea[];
}


export {
    IRegion,
    TPayloadRegion,
    TRegionList,
}
