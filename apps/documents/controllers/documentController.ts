import {get} from "lodash";
import RepoProvider from "../../RepoProvider";
import {sendResponse} from "../../../libraries";
import {
    ERROR_MESSAGE,
    RESPONSE_TYPE,
    SUCCESS_MESSAGE,
} from "../../../constants";
import {Request, Response} from "express";
import {Document} from "../../../interfaces/documents";

import {Op} from "sequelize";
import {getDocumentTransformData, transformData} from "../utils/utils"
import {DocumentModel} from "../../../database/schema/documents/documentModel";

export class DocumentController {

    static async createDocument(req: Request, res: Response) {
        try {
            const user_id = parseInt(get(req, 'user_id'));
            const payload: any = req?.body;
            payload.entity_type = Object.keys(payload)
            const documentTransform = await transformData(payload, user_id,
                false)
            // const existingRecords = await DocumentModel.findAll({
            //     where: {
            //         [Op.or]: documentTransform.map(doc => ({
            //             entity_id: doc.entity_id,
            //             doc_name: doc.doc_name,
            //             entity_type: doc.entity_type,
            //             createdBy: doc.createdBy
            //         }))
            //     }
            // });
            // if (existingRecords.length > 0) {
            //     return res.status(400)
            //         .send(
            //             sendResponse(
            //                 RESPONSE_TYPE.ERROR,
            //                 `Document ${ERROR_MESSAGE.EXISTS}`,
            //             ),
            //         );
            // }
            const documentRepo = await RepoProvider.documentRepo.createDocument(
                documentTransform)
            return res.status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.CREATED,
                        documentRepo,
                    ),
                );
        }
        catch (error) {
            console.error(error);
            return res.status(500).send(
                sendResponse(RESPONSE_TYPE.ERROR,
                    'An error occurred while creating documents.'),
            );
        }
    }

    static async getDocument(req: Request, res: Response) {
        try {
            const id = parseInt(get(req.params, "id"));
            if (isNaN(id)) throw Error('Missing id or isNaN');

            const documentRepo = await RepoProvider.documentRepo.getDocument(id)
            if (!documentRepo) {
                return res.status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            `Document ${ERROR_MESSAGE.NOT_EXISTS}`,
                        ),
                    );
            }
            const documentTransformData = await getDocumentTransformData(
                documentRepo)
            return res.status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.CREATED,
                        documentTransformData,
                    ),
                );
        }
        catch (error) {
            console.error(error);
            return res.status(500).send(
                sendResponse(RESPONSE_TYPE.ERROR,
                    'An error occurred while creating doucuments.'),
            );
        }
    }

    static async getDocumentByUser(req: Request, res: Response) {
        try {
            const user_id = parseInt(get(req, 'user_id'));
            const {entity_type, entity_id} = req.query
            const payload = {
                entity_type: entity_type,
                createdBy: user_id,
                entity_id: entity_id
            }
            const documentRepo = await RepoProvider.documentRepo.getDocumentByUser(
                payload)
            if (!documentRepo) {
                return res.status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            `Document ${ERROR_MESSAGE.NOT_EXISTS}`,
                        ),
                    );
            }
            const documentTransformData = await getDocumentTransformData(
                documentRepo)
            return res.status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.CREATED,
                        documentTransformData,
                    ),
                );
        }
        catch (error) {
            console.error(error);
            return res.status(500).send(
                sendResponse(RESPONSE_TYPE.ERROR,
                    'An error occurred while creating doucuments.'),
            );
        }
    }

    static async updateDocument(req: Request, res: Response) {
        try {
            const user_id = get(req, 'user_id', 0);
            const payload: Document[] = req?.body;
            const documentTransform = await transformData(payload, user_id,
                true)
            const documentRepo = await RepoProvider.documentRepo.updateDocument(
                documentTransform)
            if (!documentRepo) {
                return res.status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            `Document ${ERROR_MESSAGE.NOT_EXISTS}`,
                        ),
                    );
            }
            return res.status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.UPDATED,
                        documentRepo,
                    ),
                );
        }
        catch (error) {
            console.error(error);
            return res.status(500).send(
                sendResponse(RESPONSE_TYPE.ERROR,
                    'An error occurred while creating doucuments.'),
            );
        }
    }
}




