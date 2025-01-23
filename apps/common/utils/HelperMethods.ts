import { APIResponse, SuccessDTO, FailedDTO } from "../models/Base";

class HelperMethods {
    static getSuccessResponse<T>(data: T, message?: string): SuccessDTO<T> {
        return {
            code: 200,
            success: true,
            message: message ?? "Done",
            data: data,
        };
    }

    static getErrorResponse<T>(message?: string): FailedDTO<T> {
        return {
            success: false,
            message: message ?? "Something went wrong",
            data: null,
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

export { HelperMethods, handleError };
