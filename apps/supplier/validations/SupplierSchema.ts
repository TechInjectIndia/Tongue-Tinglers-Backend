import Joi from "@hapi/joi";
import { SUPPLIER_STAUS } from "../models/SupplierMisc";
export class SupplierSchema {
    static createSchema =
        Joi.object({
            name: Joi.string().min(3).max(50).required(),
            email: Joi.string().email().optional().allow(null),
            phone: Joi.string().length(10).required(),
        });

    static updateSchema =
        Joi.object({
            name: Joi.string().min(3).max(50).required(),
            email: Joi.string().email().optional().allow(null),
            phone: Joi.string().length(10).required(),
            status: Joi.string().valid(
                SUPPLIER_STAUS.ACTIVE,
                SUPPLIER_STAUS.INACTIVE,
                SUPPLIER_STAUS.DELETED,
            ).required(),
        });

}