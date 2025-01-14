import Joi from "@hapi/joi";
export class ItemUnitSchema {
    static create =
        Joi.object({
            name: Joi.string().min(2,),
        });

}