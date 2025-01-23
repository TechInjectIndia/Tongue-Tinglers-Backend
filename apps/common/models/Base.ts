import { MetaUser } from "apps/user/interface/user";

interface APIResponse<T> {
    success: boolean;
    message: string;
    data: T | null;
}

interface BaseMetaUsers {
    createdBy: number;
    updatedBy: number | null;
    deletedBy: number | null;
}

interface BaseMeta extends BaseMetaUsers {
    id: number;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
}

interface ParsedMeta {
    createdBy: MetaUser;
    updatedBy: MetaUser | null;
    deletedBy: MetaUser | null;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
}

/* TODO: mandeep singh - remove this after refactoring */
interface PaginatedBaseResponse<T> {
    totalData: number;
    currentPage: number;
    totalPages: number;
    data: T[];
}

// Success DTO
interface SuccessDTO<T> {
    code: number; // Status code, e.g., 200 for success
    success: true;
    data: T; // The data payload
    message: string; // Optional success message
}

// Failed DTO
interface FailedDTO<E = unknown> {
    // code: number; // Error status code, e.g., 400, 500
    success: false;
    data: E; // The error object or message
    message?: string; // Optional error message
}

// Export all interfaces
export {
    BaseMeta,
    ParsedMeta,
    BaseMetaUsers,
    APIResponse,
    PaginatedBaseResponse,
    SuccessDTO,
    FailedDTO,
};
