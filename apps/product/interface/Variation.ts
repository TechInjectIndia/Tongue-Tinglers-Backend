import { BaseMeta, ParsedMeta } from "apps/common/models/Base";
import { ParsedHex } from "./Hex";

interface VaraitonPayload {
    productId:number,
    images: string[]
    hexId:number,
    price:number,
}

interface IVariation extends VaraitonPayload, BaseMeta {

}

interface ParsedVariation extends ParsedMeta {
    productId: number;
    images: string[];
    hexId: ParsedHex;
    price: number;
}


export {
    IVariation,
    ParsedVariation
}