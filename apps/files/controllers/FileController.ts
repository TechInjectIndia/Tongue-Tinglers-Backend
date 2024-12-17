import { NextFunction, Request, Response } from "express";
import { FilesRepo } from '../models/FilesRepo';
import { sendResponse } from '../../../libraries';
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from '../../../constants';

import { get, isEmpty } from "lodash";

export default class FilesController {
    static async updateFile(req: Request, res: Response) {
        try {

            const id = parseInt(get(req.params, "id"));
            if (isNaN(id)) throw Error('Missing id or isNaN');

            let parsedFileDetails: any[] = [];
            let uploadedFiles: any[] = [];

            // Parse fileDetails from the request body
            const { fileDetails } = req.body;
            if (typeof fileDetails === 'string') {
                try {
                    parsedFileDetails = JSON.parse(fileDetails);
                } catch (error) {
                    return res.status(400).send({
                        error: true,
                        message: 'Invalid fileDetails format. It should be a valid JSON string.',
                    });
                }
            } else {
                parsedFileDetails = fileDetails || [];
            }

            let result: any;
            // Properly cast req.files to Express.Multer.File[]
            const files = req.files as Express.Multer.File[] | undefined;

            if (files && files.length > 0) {
                uploadedFiles = files; // Safe assignment without conflicting assertions


                // Process and upload each file
                const uploadPromises = uploadedFiles.map(async (file, index) => {
                    const details = parsedFileDetails[index] || {};

                    const fileInfo = {
                        originalname: file.originalname,
                        message: details.message || '',
                        name: details.name || file.originalname,
                        recommended: details.recommended || false,
                    };

                    const url = await new FilesRepo().updateFile(id, file, fileInfo, 'uploads');
                    return { originalname: file.originalname, url, recommended: fileInfo.recommended };
                });

                result = await Promise.all(uploadPromises);
            } else {
                // Handle case where only file metadata is updated (no new files uploaded)
                const details = parsedFileDetails[0] || {};
                const fileInfo = {
                    message: details.message || '',
                    name: details.name || '',
                    recommended: details.recommended || false,
                };

                result = await new FilesRepo().update(id, fileInfo);
            }

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
            let parsedFileDetails: any[] = [];
            let files: Express.Multer.File[] = [];

            let fileDetails = req.body.fileDetails;
            if (typeof fileDetails === 'string') {
                try {
                    parsedFileDetails = JSON.parse(fileDetails);
                } catch (error) {
                    return res.status(400).send({
                        error: true,
                        message: 'Invalid fileDetails format. It should be a valid JSON string.',
                    });
                }
            } else {
                parsedFileDetails = fileDetails;
            }

            let result: any
            if (req.files && Array.isArray(req.files) && req.files.length != 0) {
                files = req.files ?? [];

                // Process each file and upload it
                const uploadPromises = files.map(async (file: Express.Multer.File, index: number) => {
                    const details = parsedFileDetails[index];
                    const fileInfo = {
                        originalname: file.originalname,
                        message: details.message || '',
                        name: details.name || '',
                        recommended: details.recommended,
                    };

                    const url = await new FilesRepo().uploadFile(file, fileInfo, 'uploads');
                    return { originalname: file.originalname, url, recommended: fileInfo.recommended };
                });
                result = await Promise.all(uploadPromises);
            } else {
                const details = parsedFileDetails[0];
                const fileInfo = {
                    message: details.message || '',
                    name: details.name || '',
                    recommended: details.recommended,
                };
                result = await new FilesRepo().create(fileInfo);
            }

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
