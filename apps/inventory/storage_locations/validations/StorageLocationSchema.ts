import Joi from "@hapi/joi";
import { STORAGE_LOCATION_TYPE } from "../models/StorageLocationMisc";

export class StorageLocationSchema {
    static createSchema =
        Joi.object({
            name: Joi.string().min(3,),
            description: Joi.string().optional().allow(null),
            type: Joi.string().valid([STORAGE_LOCATION_TYPE.RACK, STORAGE_LOCATION_TYPE.SHELF,
            STORAGE_LOCATION_TYPE.FLOOR,

            ], {
                invalid_type_error: "Invalid type",
                required_error: "Type is required"
            }),
        });

}