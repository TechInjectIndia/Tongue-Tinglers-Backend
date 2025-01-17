import { BaseMeta } from "apps/common/models/Base";
import { MetaUser, ParsedUser } from "apps/user/interface/user";
import { parseUserToMetaUser } from "apps/user/parser/user-parser";

interface VariationStockPayload {
    stock: number;
}

interface VariationStockTable extends VariationStockPayload,BaseMeta{} 

interface ParsedVariationStock {
    id: number,
    stock: number,
    createdBy: MetaUser,
    updatedBy: MetaUser | null,
    deletedBy: MetaUser | null,
    createdAt: Date,
    updatedAt: Date | null,
    deletedAt: Date | null,
}

export const parseVariationStock = (data:any): ParsedVariationStock => {
    const variationStock:ParsedVariationStock = {
        id: data.id,
        stock: data.stock,
        createdBy: data.createdByUser ? parseUserToMetaUser(data.createdByUser) : null,
        updatedBy: data.updatedByUser ? parseUserToMetaUser(data.updatedByUser) : null,
        deletedBy: data.deletedByUser ? parseUserToMetaUser(data.deletedByUser) : null,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        deletedAt: data.deletedAt
    }
    return variationStock
}

export {
    VariationStockTable,
    VariationStockPayload,
    ParsedVariationStock
}