import Joi from "@hapi/joi";

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
            gstPercentage: Joi.number().positive(),
        });
}
