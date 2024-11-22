import { TemplateType, DocumentData, SendResponse, TemplateList, DocumentDetails } from "../../../../types";

/**
 * Interface for Zoho Sign Controller.
 */
interface IZohoSignController<T> {
    /**
     * Retrieve the access token from the database.
     * @returns Promise resolving to the access token as a string.
     */
    getAccessTokenFromDb(): Promise<string>;

    /**
     * Get the fields of a specific template.
     * @param templateId - The ID of the template to retrieve fields for.
     * @returns Promise resolving to the template fields.
     */
    getTemplateFields(templateId: number): Promise<TemplateType>;

    /**
     * Send a document using a specified template.
     * @param templateId - The ID of the template to use for sending the document.
     * @param data - The data to populate in the document.
     * @returns Promise resolving to the response after sending the document.
     */
    sendDocumentUsingTemplate(templateId: number, data: DocumentData): Promise<SendResponse>;

    /**
     * Retrieve a list of available templates.
     * @returns Promise resolving to a list of templates.
     */
    getTemplates(): Promise<TemplateList>;

    /**
     * Retrieve a document.
     * @returns Promise resolving to document.
     */
    getDocument(documentId: number): Promise<DocumentDetails>;
}

export default IZohoSignController;
