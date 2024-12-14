
import { BaseDocument, Document } from '../../../interfaces/documents';
import { IDocumentRepo } from './IDocumentRepo';
import {DocumentModel} from "../../../database/schema/documents/documentModel"
import { Op } from 'sequelize';
import { UserModel } from '../../../database/schema';
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
    async getDocument(id: number): Promise<Document[]> {
        try {
            const document = await DocumentModel.findAll({
                where: {
                    id: id,
                },
                include:[
                    {
                        model: UserModel,
                        as: 'created',
                        attributes: ['id', 'firstName', 'lastName', 'email']
                    }
                ]
            });
            return document.map((doc: DocumentModel) => doc.toJSON());
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async getDocumentByUser(data:any): Promise<Document[]> {
        try {
            const documents = await DocumentModel.findAll({
                where: {
                    createdBy: data.createdBy,
                    entity_type: data.entity_type,
                    entity_id: data.entity_id
                },
                include:[
                    {
                        model: UserModel,
                        as: 'created',
                        attributes: ['id', 'firstName', 'lastName', 'email']
                    }
                ]
            });
            return documents.map((doc: DocumentModel) => doc.toJSON());
        } catch (error) {
            console.log(error);
            return null;
        }
    }

}