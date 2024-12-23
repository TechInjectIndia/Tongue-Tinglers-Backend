
import { BaseDocument, Document } from '../../../interfaces/documents';
import { IDocumentRepo } from './IDocumentRepo';
import { UserModel } from '../../../database/schema';
import { DocumentModel } from '../../../database/schema/documents/documentModel';
export class DocumentRepo implements IDocumentRepo {

    async createDocument(document: BaseDocument[]): Promise<Document[] | null> {
        const transaction = await DocumentModel.sequelize?.transaction();
        try {


            // const documentCreated = await DocumentModel.bulkCreate(document);
            // return documentCreated.map((doc: DocumentModel) => doc.toJSON());
            const results: Document[] = [];

            for (const doc of document) {
                doc.entity_type = "franchise";
                // Check if the document exists
                const existingDocument = await DocumentModel.findOne({
                    where: {
                        doc_name: doc.doc_name,
                        entity_id: doc.entity_id,
                        entity_type: doc.entity_type,
                    },
                    transaction
                });

                if (existingDocument) {
                    // Update the document if it exists
                    doc.updatedBy = doc.createdBy;
                    delete doc.createdBy;
                    const updatedDocument = await existingDocument.update(doc, { transaction });
                    results.push(updatedDocument.toJSON());
                } else {
                    // Create the document if it does not exist
                    const createdDocument = await DocumentModel.create(doc, { transaction });
                    results.push(createdDocument.toJSON());
                }
            }
            await transaction?.commit();
            return results;
        } catch (error) {
            console.log(error);
            await transaction?.rollback();
            return null;
        }
    }

    async updateDocument(documents: BaseDocument[]): Promise<Document[] | null> {
        const transaction = await DocumentModel.sequelize?.transaction();
        try {
            const results: Document[] = [];

            for (const doc of documents) {
                doc.entity_type = "franchise";
                // Check if the document exists
                const existingDocument = await DocumentModel.findOne({
                    where: {
                        doc_name: doc.doc_name,
                        entity_id: doc.entity_id,
                        entity_type: doc.entity_type,
                    },
                    transaction
                });

                if (existingDocument) {
                    // Update the document if it exists
                    const updatedDocument = await existingDocument.update(doc, { transaction });
                    results.push(updatedDocument.toJSON());
                } else {
                    // Create the document if it does not exist
                    doc.createdBy = doc.updatedBy;
                    delete doc.updatedBy;
                    const createdDocument = await DocumentModel.create(doc, { transaction });
                    results.push(createdDocument.toJSON());
                }
            }
            await transaction?.commit();
            return results;
        } catch (error) {
            console.error(error);
            await transaction?.rollback();
            return null;
        }
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
                include: [
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
    async getDocumentByUser(data: any): Promise<Document[]> {
        try {
            const documents = await DocumentModel.findAll({
                where: {
                    entity_type: data.entity_type,
                    entity_id: data.entity_id
                },
                include: [
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
