
import { BaseDocument, Document } from '../../../interfaces/documents';
import { IDocumentRepo } from './IDocumentRepo';
import {DocumentModel} from "../../../database/schema/documents/documentModel"
import { Op } from 'sequelize';
export class DocumentRepo implements IDocumentRepo {

    async createDocument(document: BaseDocument[]): Promise<Document[] | null> {
        try {
            
            const documentCreated = await DocumentModel.bulkCreate(document);
            return documentCreated.map((doc: DocumentModel) => doc.toJSON());
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async updateDocument(documet: BaseDocument): Promise<Document> {
        throw new Error("Method not implemented.");
    }
    async deleteDocument(id: number): Promise<Document> {
        throw new Error("Method not implemented.");
    }
    async getDocument(id: number): Promise<Document> {
        throw new Error("Method not implemented.");
    }
    async getDocuments(): Promise<Document[]> {
        throw new Error("Method not implemented.");
    }
}