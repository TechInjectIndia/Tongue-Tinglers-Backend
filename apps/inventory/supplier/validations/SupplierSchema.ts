import Joi from "@hapi/joi";


export class SupplierSchema {

    static addressSchema = Joi.object({
        street: Joi.string().min(3,).max(80,),
        city: Joi.string().min(3,).max(80,),
        state: Joi.string().min(3,).max(80,),
        postalCode: Joi.string().min(3,).max(80,),
        country: Joi.string().min(3,).max(80,),
        phoneNumber: Joi.string().min(3,).max(80,),
        firstName: Joi.string().optional().allow(""),
        lastName: Joi.string().optional().allow(""),
    });


    static createSchema =
        Joi.object({
            name: Joi.string().min(3,).max(80,),
            email: Joi.string().email().allow(null),
            phone: Joi.string().min(10,).max(15,),
            gst: Joi.string().length(15,).allow(null),
            pan: Joi.string().length(10,).allow(null),
            address: SupplierSchema.addressSchema,
        });

    static updateSchema =
        Joi.object({
            name: Joi.string().min(3,).max(80,),
            email: Joi.string().email().allow(null),
            phone: Joi.string().min(10,).max(15,),
            gst: Joi.string().length(15,).allow(null),
            pan: Joi.string().length(10,).allow(null),
            address: SupplierSchema.addressSchema,
            addressId: Joi.number().positive(),
        });

}