import { Request, Response, NextFunction } from "express";
import formatResponse from "./format-response";

const getMessageFromJoiError = (joiErrors) => {
    const allowedKeys = [""];
    const errors = joiErrors.filter((item) => {
        allowedKeys.includes(item)
    }
    );
    if (errors.length === 1) {
        return errors[0].message;
    }
    return "Your request doesn't have valid parameters.";
};

const validationCheckHandler = (res, next, result) => {
    if (result) {
        res.status(400).send(
            formatResponse(
                getMessageFromJoiError(result),
                process.env.NODE_ENV === "production" ? {} : null,
                true,
                result
            )
        );
        return res.send();
    }
    return next();
};

export const validateReq = (
    req: Request,
    res: Response,
    next: NextFunction,
    schema,
    typeName: string
) => {

    let result;
    switch (typeName) {
        case "params":
            result = errorResponseParser(schema, req.params);
            
            break;
        case "query":
            result = errorResponseParser(schema, req.query);
            
            break;
        default:
            // result = schema.validate(req.body);
            result = errorResponseParser(schema, req.body)
            
            break;
    }
    validationCheckHandler(res, next, result);
};

function errorResponseParser(schema,body){
    const { error } = schema.validate(body, { abortEarly: false });

if (error) {
    // Format errors in the desired structure
    const formattedErrors = error.details.map((detail) => ({
        key: detail.path.join("."), // Join nested paths
        message: detail.message.replace(/"/g, ""), // Remove quotes
    }));
    return formattedErrors
} else {
    console.log("Validation successful!");
}

}
