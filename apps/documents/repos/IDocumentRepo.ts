import {BaseDocument, Document} from '../../../interfaces/documents'

export interface IDocumentRepo {
    createDocument(documet: BaseDocument[]): Promise<Document[] | null>
    updateDocument(documet: BaseDocument): Promise<Document>
    deleteDocument(id: number): Promise<Document>
    getDocument(id: number): Promise<Document>
    getDocuments(): Promise<Document[]>
}