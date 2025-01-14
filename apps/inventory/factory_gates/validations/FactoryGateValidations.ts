import { Request, Response, NextFunction } from "express";
import { FactoryGateSchema } from "./FactoryGateSchema";
import { get, isArray, pick } from "lodash";
import { HelperMethods } from "apps/common/utils/HelperMethods";

export class FactoryGateValidations {
    static validateCreate = (req: Request, res: Response, next: NextFunction) => {

        const { error } = FactoryGateSchema.createSchema.validate(req.body);

        if (error) {
            return res.status(400).json(HelperMethods.getErrorResponse(error.details[0].message));
        }
        return next();
    }

    static validateUpdate = (req: Request, res: Response, next: NextFunction) => {

        const id = get(req.params, "id");
        if (!id) {
            res.status(400).send(HelperMethods.getErrorResponse("Id is required"));
            return;
        }
        else {
            try {
                parseInt(id);
            }
            catch (error) {
                res.status(400).send(HelperMethods.getErrorResponse("Id is not a number"));
                return;
            }
        }

        const { error } = FactoryGateSchema.createSchema.validate(req.body);

        if (error) {
            return res.status(400).json(HelperMethods.getErrorResponse(error.details[0].message));
        }
        return next();
    }

    static validateDelete = (req: Request, res: Response, next: NextFunction) => {

        const ids = pick(req.body, "ids");
        if (!ids || !isArray(ids)) {
            res.status(400).send(HelperMethods.getErrorResponse("Ids are required"));
            return;
        }
        for (const id of ids) {
            if (typeof id !== "number") {
                res.status(400).send(HelperMethods.getErrorResponse("Ids are required"));
                return;
            }
        }
        return next();
    }

    static validateGetAll = (req: Request, res: Response, next: NextFunction) => {

        // const ids = pick(req.body, "ids");
        // if (!ids || !isArray(ids)) {
        //     res.status(400).send(HelperMethods.getErrorResponse("Ids are required"));
        //     return;
        // }
        // for (const id of ids) {
        //     if (typeof id !== "number") {
        //         res.status(400).send(HelperMethods.getErrorResponse("Ids are required"));
        //         return;
        //     }
        // }


        // const result = SupplierSchema.createSchema.safeParse(req.body);

        // let errorMessage = "";
        // if (!result.success) {

        //     if (result.error.errors[0].message === "Required") {
        //         errorMessage = result.error.errors[0].path[0].toString().toUpperCase() + " is required";
        //     }
        //     else {
        //         errorMessage = result.error.errors[0].message;
        //     }

        //     res.status(400).send(HelperMethods.getErrorResponse(errorMessage));
        //     return;
        // }
        return next();
    }

    static validateGetById = (req: Request, res: Response, next: NextFunction) => {

        const id = get(req.params, "id");
        if (!id || typeof Number(id) !== "number") {
            res.status(400).send(HelperMethods.getErrorResponse("Invalid id"));
            return;
        }

        return next();
    }
}