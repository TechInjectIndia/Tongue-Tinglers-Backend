import { BaseMeta, BaseMetaUsers } from "apps/common/models/Base";


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

export {
    BaseDocument,
    SaveDocument,
    DocumentData
}


