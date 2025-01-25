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
    createdBy: MetaUser  ;
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



export { BaseMeta, ParsedMeta, BaseMetaUsers, APIResponse, PaginatedBaseResponse };




