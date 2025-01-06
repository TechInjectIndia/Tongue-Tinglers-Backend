import Joi from "@hapi/joi";
import { FACTORY_GATE_STAUS } from "../models/FactoryGateMisc";
export class FactoryGateSchema {
    static createSchema =
        Joi.object({
            name: Joi.string().min(3).max(50),
            description: Joi.string().optional().allow(null),

        });
    static updateSchema =
        Joi.object({
            name: Joi.string().min(3).max(50),
            description: Joi.string().optional().allow(null),
            status: Joi.string().valid(
                FACTORY_GATE_STAUS.ACTIVE,
                FACTORY_GATE_STAUS.INACTIVE,
                FACTORY_GATE_STAUS.DELETED,
            ).required(),
        });

}