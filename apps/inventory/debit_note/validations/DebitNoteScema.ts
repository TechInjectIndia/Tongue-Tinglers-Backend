import Joi from "@hapi/joi";

export class DebitNoteSchema {
    static markPaidSchema =
        Joi.object({
            id: Joi.number().positive(),
            note: Joi.string().allow(null),
        });

}