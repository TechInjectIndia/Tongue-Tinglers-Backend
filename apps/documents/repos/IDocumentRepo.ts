import { BaseDocument, SaveDocument } from "../interface/Document"

export interface IDocumentRepo {
    createDocument(documet: BaseDocument[]): Promise<SaveDocument[] | null>
    updateDocument(documents: BaseDocument[]): Promise<SaveDocument[] | null>
    deleteDocument(id: number): Promise<Array<SaveDocument>>
    getDocument(id: number): Promise<SaveDocument[]>
    getDocumentByUser(data: any): Promise<SaveDocument[]>
}