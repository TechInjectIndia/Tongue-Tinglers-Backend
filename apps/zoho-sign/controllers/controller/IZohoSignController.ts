import { TListFilters, TEditUser } from "../../../../types";

interface IZohoSignController<T, TListFilters> {
    getAccessTokenFromDb(): Promise<string>; // Assuming it returns an access token as a string
    getTemplate(templateId: string): Promise<any>; // Define a specific type if known
    getTemplates(): Promise<any>; // Define a specific type if known
}

export default IZohoSignController;
