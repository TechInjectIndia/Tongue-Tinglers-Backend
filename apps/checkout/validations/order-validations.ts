import Joi from '@hapi/joi';
import {NextFunction, Request, Response} from "express";

const preSaleOrderParamsValidation = Joi.object({
    userId: Joi.string().required(), // userId is mandatory
});

const orderParamsValidation = Joi.object({
    userId: Joi.string().required(), // userId is mandatory
    couponCode: Joi.string().optional(), // couponCode is optional
    shippingAddId: Joi.number().integer().required(),
    billingAddId: Joi.number().integer().required(),
});

// todo @Nitesh keep this in common module for others to reuse
const validate = (schema: Joi.Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const {error} = schema.validate(req.body, {abortEarly: false});
        if (error) {
            return res.status(400).json({
                message: 'Validation error',
                details: error.details.map((detail) => detail.message),
            });
        }
        next();
    };
};



export {orderParamsValidation, preSaleOrderParamsValidation, validate }
