import {APIResponse} from "../models/ApiResponse";

class HelperMethods {

    static getSuccessResponse<T>(data: T, message?: string): APIResponse<T> {
        return {
            success: true,
            message: message ?? "Done",
            data: data
        };
    }

    static getErrorResponse<T>(message?: string): APIResponse<T> {
        return {
            success: false,
            message: message ?? "Something went wrong",
            data: null
        };
    }
}

function handleError(error: unknown, ...params: any[]) {
    console.error(error);
    if (params && params.length > 0) {
        params.forEach((param) => {
            console.log(param);
        });
    }
}

export {HelperMethods, handleError};
