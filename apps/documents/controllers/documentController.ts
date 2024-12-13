import { get } from "lodash";
import { BaseOptionsValue } from "../../../interfaces/optionsValue";
import RepoProvider from "../../RepoProvider";
import { sendResponse } from "../../../libraries";
import { ERROR_MESSAGE, RESPONSE_TYPE, SUCCESS_MESSAGE } from "../../../constants";
import { Request, Response } from "express";
import { BaseDocument, Document } from '../../../interfaces/documents';
import { DocumentModel } from "../../../database/schema/documents/documentModel";
import { Op } from "sequelize";

export class DocumentController {
    static async createDocument(req: Request, res: Response){
        try {
            const user_id = get(req, 'user_id', 0);
            const payload:any = req?.body;
            payload.entity_type = Object.keys(payload)
            const transformData = await DocumentController.prototype.transformData(payload, user_id)
            const existingRecords = await DocumentModel.findAll({
                where: {
                    [Op.or]: transformData.map(doc => ({
                        entity_id: doc.entity_id,
                        doc_name: doc.doc_name,
                        entity_type: doc.entity_type,
                        createdBy: doc.createdBy
                    }))
                }
            });
            if (existingRecords.length > 0) {
                return res.status(400)
                                .send(
                                sendResponse(
                                    RESPONSE_TYPE.ERROR,
                                    `Document ${ERROR_MESSAGE.EXISTS}`,
                                ),
                            );
            }
            const documentRepo = await RepoProvider.documentRepo.createDocument(transformData)
            return res.status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.CREATED,
                        documentRepo,
                    ),
                );
        } catch (error) {
            console.error(error);
            return res.status(500).send(
                sendResponse(RESPONSE_TYPE.ERROR, 'An error occurred while creating doucuments.'),
            );
        }
    }

    // Function to transform data
    transformData(data:any, userId:any){
        const transformed = [];
        for (const [entityType, entities] of Object.entries(data)) {
            (entities as Document[]).forEach(entity => {
                if(typeof entity !== 'string'){
                    transformed.push({
                        entity_id: entity.entity_id,
                        doc_name: entity.doc_name,
                        entity_type: entityType, // Add entity_type based on key
                        link: entity.link,
                        createdBy: userId,
                    });
                }
            });
        }
        return transformed;
    };
}

