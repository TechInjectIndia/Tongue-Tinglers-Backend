import Joi from "@hapi/joi";
import { ITEM_UNIT_STAUS } from "../models/ItemUnitMisc";

export class ItemUnitSchema {
    static create =
        Joi.object({
            name: Joi.string().min(2).max(10).required(),
        });

    static update =
        Joi.object({
            name: Joi.string().min(2).max(10),
            status: Joi.string().valid(ITEM_UNIT_STAUS.ACTIVE, ITEM_UNIT_STAUS.INACTIVE, ITEM_UNIT_STAUS.DELETED).required(),
        });
}