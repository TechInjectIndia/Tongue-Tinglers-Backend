import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { validateReq } from "../../../libraries";

const createCommissionSchema = Joi.object({

    type: Joi.string()
        .valid('absolute', 'percentage')
        .required()
        .messages({
            'any.required': 'Commission type is required.',
            'any.only': 'Commission type must be a valid type.',
        }),

    value: Joi.number().required().messages({
        'any.required': 'Commission value is required',
    }),

    eventType: Joi.string()
        .valid('franchise-sold', 'raw-material-sold')
        .required()
        .messages({
            'any.required': 'Commission event type is required.',
            'any.only': 'Commission event type must be a valid type.',
        }),

});


const validateCreateCommission = (req: Request, res: Response, next: NextFunction) => {
    const { error } = createCommissionSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

export { validateCreateCommission };
