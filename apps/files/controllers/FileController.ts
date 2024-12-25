import { NextFunction, Request, Response } from "express";
import { FilesRepo } from '../models/FilesRepo';
import { sendResponse } from '../../../libraries';
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from '../../../constants';

import { get, isEmpty } from "lodash";

export default class FilesController {
    static async updateFile(req: Request, res: Response) {
        try {

            const id = parseInt(get(req.params, "id")); // Assuming the file ID is passed as a URL parameter
            const fileDetails = req.body;
    
            // Build the update information
            const fileInfo = {
                message: fileDetails.message || '',
                name: fileDetails.name || '',
                recommended: fileDetails.recommended || false,
                subject: fileDetails.subject,
                url: fileDetails.files
            };
            
            let result = await new FilesRepo().update(id, fileInfo);
        
            // Send success response
            return res
                .status(200)
                .send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.UPLOADED, { result }));
        } catch (err) {
            console.error('Error:', err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async searchFiles(req: Request, res: Response) {
        const { name, message } = req.query;

        try {
            const files = await new FilesRepo().searchFiles(
                name as string,
                message as string,
            );

            return res.status(200).json(files);
        } catch (error) {
            console.error('Error searching files:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    static async uploadFile(req: Request, res: Response) {
        try {
            let fileDetails = req.body;
            let result: any
            const fileInfo = {
                message: fileDetails.message || '',
                name: fileDetails.name || '',
                recommended: fileDetails.recommended || false,
                subject: fileDetails.subject,
                url: fileDetails.files
            };
            result = await new FilesRepo().create(fileInfo);
            return res.status(200).send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.UPLOADED, { result }));
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    // Get files
    static async getFiles(req: Request, res: Response) {
        try {
            const files = await new FilesRepo().getFiles();
            return res.status(200).send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.FETCHED, files));
        } catch (err) {
            console.error("Error fetching files:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(get(req.params, "id"));
            if (isNaN(id)) throw Error('Missing id or isNaN');

            const existingFranchiseModel = await new FilesRepo().get(id);

            if (isEmpty(existingFranchiseModel)) {
                return res
                    .status(400)
                    .send(
                        sendResponse(
                            RESPONSE_TYPE.ERROR,
                            ERROR_MESSAGE.NOT_EXISTS
                        )
                    );
            }

            return res
                .status(200)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.SUCCESS,
                        SUCCESS_MESSAGE.FETCHED,
                        existingFranchiseModel
                    )
                );
        } catch (err) {
            console.error("Error:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }

    // Delete file
    static async deleteFile(req: Request, res: Response) {
        try {
            const fileName = req.params.id; // Assuming file ID is passed as filename
            await new FilesRepo().deleteFile(fileName);
            return res.status(200).send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.DELETED));
        } catch (err) {
            console.error("Error deleting file:", err);
            return res.status(500).send({
                message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
            });
        }
    }
}
