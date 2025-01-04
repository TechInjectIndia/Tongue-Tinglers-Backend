import Joi from "@hapi/joi";

export class ItemCategorySchema {
    static create =
        Joi.object({
            name: Joi.string().min(3, "Name must be at least 3 characters long").max(20, "Name must be up to 20 characters long"),
        });

}