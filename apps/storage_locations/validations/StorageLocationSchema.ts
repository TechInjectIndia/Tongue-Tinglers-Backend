import Joi from "@hapi/joi";
import { STORAGE_LOCATION_STAUS, STORAGE_LOCATION_TYPE } from "../models/StorageLocationMisc";

export class StorageLocationSchema {
    static createSchema =
        Joi.object({
            name: Joi.string().min(3,).max(50,),
            description: Joi.string().optional().allow(null),
            type: Joi.string().valid(STORAGE_LOCATION_TYPE.RACK, STORAGE_LOCATION_TYPE.SHELF).required(),
        });

    static updateSchema =
        Joi.object({
            name: Joi.string().min(3,).max(50,),
            description: Joi.string().optional().allow(null),
            type: Joi.string().valid(STORAGE_LOCATION_TYPE.RACK, STORAGE_LOCATION_TYPE.SHELF).required(),
            status: Joi.string().valid(
                STORAGE_LOCATION_STAUS.ACTIVE,
                STORAGE_LOCATION_STAUS.INACTIVE,
                STORAGE_LOCATION_STAUS.DELETED,
            )
        });

}