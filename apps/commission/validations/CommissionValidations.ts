import { NextFunction, Request, Response } from "express";
import Joi from "@hapi/joi";
import { get } from "lodash";
import { HelperMethods } from "../../common/utils/HelperMethods";
import { COMMISSION_PAID_STATUS } from "../model/CommissionEntityMappingTable";


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
        .valid('master-franchise-franchise-sold', 'master-franchise-raw-material-sold', 'affiliate-franchise-sold', 'affiliate-raw-material-sold')
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
        .valid('master-franchise-franchise-sold', 'master-franchise-raw-material-sold', 'affiliate-franchise-sold', 'affiliate-raw-material-sold')
        .required()
        .messages({
            'any.required': 'Commission event type is required.',
            'any.only': 'Commission event type must be a valid type.',
        }),

});


const validateUpdateCommission = (req: Request, res: Response, next: NextFunction) => {

    /* get params */
    const id = parseInt(get(req.params, "id"));

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

    const id = parseInt(get(req.params, "id"));

    if (!id || id <= 0) {
        return res.status(400).send(HelperMethods.getErrorResponse('Invalid request'));
    }
    next();
};



const organizationCommissionSchema = Joi.object().keys({
    organizationId: Joi.number().integer().required(),
    commissionId: Joi.number().integer().required()
});

const commissionMapEntrySchema = Joi.object({
    franchiseId: Joi.number().required(),
    mappings: Joi.array().items(organizationCommissionSchema).required(),
});


const validateCreateCommissionMapEntry = (req: Request, res: Response, next: NextFunction) => {
    const { error } = commissionMapEntrySchema.validate(req.body);
    if (error) {
        return res.status(400).json(HelperMethods.getErrorResponse(error.details[0].message));
    }
    next();
};

const validateSearchCommission = (req: Request, res: Response, next: NextFunction) => {
    const title = get(req.query, "title");


    if (!title || title.length === 0) {
        return res.status(400).json(HelperMethods.getErrorResponse("Invalid request"));
    }
    next();
};

const updateCommissionEntityStatusSchema = Joi.object({
    status: Joi.string()
        .valid(...Object.values(COMMISSION_PAID_STATUS))
        .required()
        .messages({
            "string.base": "Status must be a string.",
            "any.only": `Status must be one of ${Object.values(COMMISSION_PAID_STATUS).join(", ")}.`,
            "any.required": "Status is required.",
        }),
});
const validateUpdateCommissionEntityStatus = (req: Request, res: Response, next: NextFunction) => {
    const { error } = updateCommissionEntityStatusSchema.validate(req.body);
    if (error) {
        return res.status(400).json(HelperMethods.getErrorResponse(error.details[0].message));
    }
    next();
};


export { validateCreateCommission, validateUpdateCommission, validateDeleteCommission, validateGetCommissionById, validateCreateCommissionMapEntry, validateSearchCommission, validateUpdateCommissionEntityStatus };
