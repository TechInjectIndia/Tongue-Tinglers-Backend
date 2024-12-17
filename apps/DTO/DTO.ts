type DTO<T, E = unknown> = SuccessDTO<T> | FailedDTO<E>;

enum DTO_CODE {
    SUCCESS,
    HANDLED_ERROR,
    UNHANDLED_ERROR,
}

interface SuccessDTO<T> {
    success: true;
    code: DTO_CODE.SUCCESS;
    message: string | null;
    data: T;
}

/**
 * code 1 mean handled, code 2 means need to handle
 */
interface FailedDTO<E> {
    code: DTO_CODE.HANDLED_ERROR | DTO_CODE.UNHANDLED_ERROR;
    success: false;
    message: string;
    data: null;
    error: E | null;
}

/* -------------------------------------------------------------------------- */
/*                                    Functions                               */
/* -------------------------------------------------------------------------- */

const getSuccessDTO = <T, E>(data: T, message: string | null = null): DTO<T, E> => {
    const res: DTO<T, E> = {
        success: true,
        code: DTO_CODE.SUCCESS,
        message,
        data,
    };
    return res;
};

const getHandledErrorDTO = <T, E>(message: string, error: E | null = null): DTO<T, E> => {
    const dto: DTO<T, E> = {
        success: false,
        code: DTO_CODE.HANDLED_ERROR,
        message,
        data: null,
        error,
    };
    return dto;
};

const getUnhandledErrorDTO = <T, E>(message: string, error: E | null = null): DTO<T, E> => {
    const dto: DTO<T, E> = {
        success: false,
        code: DTO_CODE.UNHANDLED_ERROR,
        message,
        data: null,
        error,
    };
    return dto;
};
export { getSuccessDTO, getUnhandledErrorDTO, getHandledErrorDTO, DTO_CODE, type DTO };