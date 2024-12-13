import {BaseMetaUsers, BaseMeta} from '../database/schema/base/Base'

interface BaseDocument extends BaseMetaUsers {
    doc_name: string;
    link: string;
    entity_type: string;
    entity_id: number;

}

interface Document extends BaseMeta, BaseDocument{}

export {
    BaseDocument,
    Document
}


