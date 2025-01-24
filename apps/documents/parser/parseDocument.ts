import { parseUserToMetaUser } from "apps/user/parser/user-parser";
import { ParsedDocument } from "../interface/Document";

const parseDocument = (document: any): ParsedDocument => {
    const parsedDocument: ParsedDocument = {
        id: document.id,
        doc_name: document.doc_name,
        link: document.link,
        entity_type: document.entity_type,
        entity_id: document.entity_id,
        createdBy: parseUserToMetaUser(document.createdByUser),
        updatedBy: document.updatedByUser ? parseUserToMetaUser(document.updatedByUser) : null,
        deletedBy: document.deletedBy ? parseUserToMetaUser(document.deletedByUser) : null,
        createdAt: document.createdAt,
        updatedAt: document.updatedAt,
        deletedAt: document.deletedAt,
    };
    return parsedDocument;
}

export {parseDocument}