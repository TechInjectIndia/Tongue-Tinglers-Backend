import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { get } from "lodash";
import { HelperMethods } from "../../common/utils/HelperMethods";


const createCommissionSchema = Joi.object({

    title: Joi.string()
        .required()
        .messages({
            'any.required': 'Commission title is required.',
        }),

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


const updateCommissionSchema = Joi.object({
    title: Joi.string()
        .required()
        .messages({
            'any.required': 'Commission title is required.',
        }),
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


const validateUpdateCommission = (req: Request, res: Response, next: NextFunction) => {

    /* get params */
    let id = get(req.params, "id", 0);
    try {
        id = parseInt(id);

    } catch (error) {
        id = 0;
    }

    if (!id || id <= 0) {
        return res.status(400).send(HelperMethods.getErrorResponse('Id of the commission to be updated is required.'));
    }


    const { error } = updateCommissionSchema.validate(req.body);
    if (error) {
        return res.status(400).json(HelperMethods.getErrorResponse(error.details[0].message));
    }
    next();
};




const deleteCommissionSchema = Joi.object({
    ids: Joi.array()
        .items(Joi.number())
        .required()
        .messages({
            'any.required': 'Positive Ids to delete commissions are required.',
        }),
});

const validateDeleteCommission = (req: Request, res: Response, next: NextFunction) => {
    const { error } = deleteCommissionSchema.validate(req.body);
    if (error) {
        return res.status(400).json(HelperMethods.getErrorResponse(error.details[0].message));
    }
    next();
};

const validateGetCommissionById = (req: Request, res: Response, next: NextFunction) => {
    /* get params */
    let id = get(req.params, "id", 0);
    try {
        id = parseInt(id);

    } catch (error) {
        id = 0;
    }
    if (!id || id <= 0) {
        return res.status(400).send(HelperMethods.getErrorResponse('Invalid request'));
    }
    next();
};



const organizationCommissionSchema = Joi.object().keys({
    organizationId: Joi.number().integer().required(),
    commissionId: Joi.number().integer().required()
});

const commissionMapEntrySchema = Joi.array().items(organizationCommissionSchema).min(1).required();


const validateCreateCommissionMapEntry = (req: Request, res: Response, next: NextFunction) => {
    const { error } = commissionMapEntrySchema.validate(req.body);
    if (error) {
        return res.status(400).json(HelperMethods.getErrorResponse(error.details[0].message));
    }
    next();
};


export { validateCreateCommission, validateUpdateCommission, validateDeleteCommission, validateGetCommissionById, validateCreateCommissionMapEntry };
