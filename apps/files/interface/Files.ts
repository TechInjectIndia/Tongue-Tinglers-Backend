import { BaseMeta, ParsedMeta } from "apps/common/models/Base";
import { MetaUser } from "apps/user/interface/user";

export interface QuickActionsFilesPayload {
    name: string;
    message: string;
    subject: string;
    url: Array<string>;
    status: QuickActionsStatus;
}

export interface QuickActionsTable extends QuickActionsFilesPayload, BaseMeta {
}

export interface ParsedQuickActionsFiles extends ParsedMeta{
    id: number;
    name: string;
    subject: string;
    message: string;
    url: Array<string>;
    status: QuickActionsStatus;
}

export enum QuickActionsStatus {
    Active = "active",
    Inactive = "inactive"
}
