import { TemplateType, DocumentData, SendResponse, TemplateList, FieldType } from "../../../../types";

interface IZohoSignController<T> {
    getAccessTokenFromDb(): Promise<string>;
    getTemplateFields(templateId: string): Promise<TemplateType>;
    sendDocumentUsingTemplate(templateId: string, data: DocumentData): Promise<SendResponse>;
    getTemplates(): Promise<TemplateList>;
}

export default IZohoSignController;
