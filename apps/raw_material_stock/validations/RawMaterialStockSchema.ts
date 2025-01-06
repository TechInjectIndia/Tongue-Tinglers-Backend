import Joi from "@hapi/joi";

export class RawMaterialStockSchema {
    static receiveStock =
        Joi.object({
            rawMaterialId: Joi.number().positive().required(),
            qty: Joi.number().positive().required(),
            storageLocationId: Joi.number().positive().required(),
            factoryGateId: Joi.number().positive().required(),
            supplierId: Joi.number().positive().required(),
            unitCost: Joi.number().positive().required(),
        });

}