import { APIResponse } from "../models/ApiResponse";

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

    static handleError(error: any): void {
        console.error(error);
    }
}

export { HelperMethods };