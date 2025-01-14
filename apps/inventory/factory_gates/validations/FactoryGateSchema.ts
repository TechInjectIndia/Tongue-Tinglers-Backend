import Joi from "@hapi/joi";
export class FactoryGateSchema {
    static createSchema =
        Joi.object({
            name: Joi.string().min(3,),
            description: Joi.string().optional().allow(null),

        });

}