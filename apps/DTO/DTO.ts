type DTO<T> =
    | {
    success: true;
    code: DTO_CODES.SUCCESS;
    message: string | null;
    data: T;
}
    | {
    code: DTO_CODES.HANDLED_ERROR | DTO_CODES.UNHANDLED_ERROR; // code 1 means handled, code 2 means need to handle
    success: false;
    message: string;
    error: unknown;
    data: null;
};

enum DTO_CODES {
    SUCCESS,
    HANDLED_ERROR,
    UNHANDLED_ERROR,
}

// Getter Functions

const getSuccessDTO = <T>(data: T, message: string | null = null): DTO<T> => {
    return {
        success: true,
        code: DTO_CODES.SUCCESS,
        message,
        data,
    };
};

const getHandledErrorDTO = <T>(message: string, error: any = null): DTO<T> => {
    return {
        success: false,
        code: DTO_CODES.HANDLED_ERROR,
        message,
        error,
        data: null,
    };
};

const getUnhandledErrorDTO = <T>(message: string, error: any = null): DTO<T> => ({
    success: false,
    code: DTO_CODES.UNHANDLED_ERROR,
    message,
    error,
    data: null,
});

export {
    getSuccessDTO,
    getUnhandledErrorDTO,
    getHandledErrorDTO,
    DTO_CODES,
    type DTO,
};
