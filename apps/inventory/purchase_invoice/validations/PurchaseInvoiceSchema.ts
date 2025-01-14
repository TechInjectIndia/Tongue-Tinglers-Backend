import Joi from "@hapi/joi";

export class PurchaseInvoiceSchema {
    static createSchema =
        Joi.object({
            invoiceNumber: Joi.string().min(3,).max(50,),
            invoiceDate: Joi.string(),
            poNumber: Joi.string().min(3,).max(80,),
            poDate: Joi.string(),
            supplierId: Joi.number().positive(),
            factoryGateId: Joi.number().positive(),
            purchasedById: Joi.number().positive(),
            rawMaterials: Joi.array().items(
                Joi.object({
                    rawMaterialId: Joi.number().positive(),
                    totalQty: Joi.number().positive(),
                    price: Joi.number().positive(),
                    rejectedQty: Joi.number().min(0),
                    rejectionReason: Joi.string().min(8,).max(500,).allow(null),
                    rejectedById: Joi.number().positive().allow(null),
                    holdQty: Joi.number().min(0),
                    holdReason: Joi.string().min(8,).max(500,).allow(null),
                    holdById: Joi.number().positive().allow(null),
                })
            ),
        });
}