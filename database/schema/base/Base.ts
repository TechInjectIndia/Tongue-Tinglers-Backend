import { ParsedUser } from "../../../interfaces";

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
    createdBy: ParsedUser;
    updatedBy: ParsedUser | null;
    deletedBy: ParsedUser | null;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
}

export { BaseMeta, BaseMetaUsers,ParsedMeta };
