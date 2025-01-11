import { parseUserToMetaUser } from "apps/user/parser/user-parser";
import { ParsedQuickActionsFiles } from "../interface/Files";

const parseFile = (fileData:any): ParsedQuickActionsFiles =>{
    const parsedData: ParsedQuickActionsFiles = {
        id: fileData.id,
        name: fileData.name,
        subject: fileData.subject,
        message: fileData.message,
        status: fileData.status,
        url: fileData.url,
        createdAt: fileData.createdAt,
        updatedAt: fileData.updatedAt,
        createdBy: parseUserToMetaUser(fileData.createdByUser),
        updatedBy: fileData.updatedByUser ? parseUserToMetaUser(fileData.updatedByUser) : null,
        deletedAt: fileData.deletedAt,
        deletedBy: fileData.deletedByUser ? parseUserToMetaUser(fileData.deletedByUser) : null
    };
    return parsedData;
}

export { parseFile };