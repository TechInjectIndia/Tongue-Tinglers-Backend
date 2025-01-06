import Joi from "@hapi/joi";
import { RAW_MATERIAL_STAUS } from "../models/RawMaterialMisc";

export class RawMaterialSchema {

    private static rawMaterialPriceData = Joi.object({
        moq: Joi.number().positive().required(),
        price: Joi.number().positive().required(),
        supplierId: Joi.number().positive().required(),
    });

    static create =
        Joi.object({
            name: Joi.string().min(3).max(20).required(),
            unitId: Joi.number().positive().required(),
            categoryId: Joi.number().positive().required(),
            sku: Joi.string().min(3).max(20).required(),
            msq: Joi.number().positive().required(),
            priceData: Joi.array().items(RawMaterialSchema.rawMaterialPriceData).required(),
        });

    static update =
        Joi.object({
            name: Joi.string().min(3).max(20).required(),
            unitId: Joi.number().positive().required(),
            categoryId: Joi.number().positive().required(),
            sku: Joi.string().min(3).max(20).required(),
            msq: Joi.number().positive().required(),
            priceData: Joi.array().items(RawMaterialSchema.rawMaterialPriceData).required(),
            status: Joi.string().valid(
                RAW_MATERIAL_STAUS.ACTIVE,
                RAW_MATERIAL_STAUS.INACTIVE,
                RAW_MATERIAL_STAUS.DELETED,
            ).required(),
        });
}
