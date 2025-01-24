import { BaseMeta, ParsedMeta } from "apps/common/models/Base";

interface HexPayload {
    hex:string,
    variationId:number,
    enabled:boolean
}

interface IHexTable extends HexPayload,BaseMeta{
   
}

interface ParsedHex extends ParsedMeta {
    id:number,
    hex: string;
    variationId: number;
    enabled: boolean;
}


export {
    IHexTable,
    ParsedHex
}