import Joi from "@hapi/joi";
import { ITEM_CATEGORY_STAUS } from "../models/ItemCategoryMisc";

export class ItemCategorySchema {
    static create =
        Joi.object({
            name: Joi.string().min(3),
        });

    static update =
        Joi.object({
            name: Joi.string().min(3),
            status: Joi.string().valid(...[
                ITEM_CATEGORY_STAUS.ACTIVE,
                ITEM_CATEGORY_STAUS.INACTIVE,
                ITEM_CATEGORY_STAUS.DELETED,
            ]),
        });
}