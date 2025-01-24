import { BaseMeta, ParsedMeta } from "apps/common/models/Base";
import { ParsedVariation } from "./Variation";

interface StockPayload {
    variationId:number,
    productId:number,
    stock:number,
}

interface IStock extends StockPayload,BaseMeta {
   
}

interface ParsedStock extends ParsedMeta {
    variationId:number,
    productId:number,
    stock:number,
}

export {
    IStock,
    ParsedStock
}