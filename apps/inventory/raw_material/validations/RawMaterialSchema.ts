import Joi from "@hapi/joi";
import { RAW_MATERIAL_STAUS } from "../models/RawMaterialMisc";

export class RawMaterialSchema {

    private static rawMaterialPriceData = Joi.object({
        moq: Joi.number().min(0),
        price: Joi.number().positive(),
        supplierId: Joi.number().positive(),
    });

    static create =
        Joi.object({
            name: Joi.string().min(3).max(100,),
            unitId: Joi.number().positive(),
            categoryId: Joi.number().positive(),
            sku: Joi.string().min(3,).max(30,),
            msq: Joi.number().min(0),
            priceData: Joi.array().items(RawMaterialSchema.rawMaterialPriceData),
            hsn: Joi.string().min(3,).max(30,),
            gstPercentage: Joi.number().min(0),
        });

    static update =
        Joi.object({
            name: Joi.string().min(3).max(100,),
            unitId: Joi.number().positive(),
            categoryId: Joi.number().positive(),
            sku: Joi.string().min(3,).max(30,),
            msq: Joi.number().min(0),
            priceData: Joi.array().items(RawMaterialSchema.rawMaterialPriceData),
            hsn: Joi.string().min(3,).max(30,),
            gstPercentage: Joi.number().min(0),
            status: Joi.string().valid(...[
                RAW_MATERIAL_STAUS.ACTIVE,
                RAW_MATERIAL_STAUS.INACTIVE,
                RAW_MATERIAL_STAUS.DELETED,
            ]),
        });
}
