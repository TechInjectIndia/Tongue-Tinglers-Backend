import Joi from "@hapi/joi";

export class ItemCategorySchema {
    static create =
        Joi.object({
            name: Joi.string().min(3),
        });
}