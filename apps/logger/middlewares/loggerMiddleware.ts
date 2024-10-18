import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";

const loggerMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const startTime = Date.now();

    // Capture the original send method
    const originalSend = res.send;

    res.send = function (body) {
        const responseTime = Date.now() - startTime;
        logger.info({
            method: req.method,
            url: req.url,
            body: req.body,
            status: res.statusCode,
            responseTime,
            responseBody: body,
        });

        return originalSend.call(this, body);
    };

    next();
};

export { loggerMiddleware };
