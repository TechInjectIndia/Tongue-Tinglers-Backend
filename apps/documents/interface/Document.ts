import { BaseMeta, BaseMetaUsers } from "apps/common/models/Base";
import { MetaUser } from "apps/user/interface/user";


interface BaseDocument extends BaseMetaUsers {
    doc_name: string;
    link: string;
    entity_type: string;
    entity_id: number;
}

interface SaveDocument extends BaseMeta, BaseDocument{}

interface DocumentData {
    entity_id: number;
    doc_name: string;
    entity_type: string;
    link: string;
    createdBy: number;
}

interface ParsedDocument {
    id: number;
    doc_name: string;
    link: string;
    entity_type: string;
    entity_id: number;
    createdBy: MetaUser;
    updatedBy: MetaUser | null;
    deletedBy: MetaUser | null;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
}

export {
    BaseDocument,
    SaveDocument,
    DocumentData,
    ParsedDocument
}


