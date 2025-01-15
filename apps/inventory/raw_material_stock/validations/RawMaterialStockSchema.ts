import Joi from "@hapi/joi";

export class RawMaterialStockSchema {
    static receiveStock =
        Joi.object({
            rawMaterialId: Joi.number().positive(),
            qty: Joi.number().positive(),
            storageLocationId: Joi.number().positive().allow(null),
            factoryGateId: Joi.number().positive(),
            supplierId: Joi.number().positive(),
            price: Joi.number().positive(),
        });

}