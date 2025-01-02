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


export { BaseMeta, ParsedMeta, BaseMetaUsers };

export { APIResponse };