import { Request, Response } from 'express';
import { FilesRepo } from '../models/FilesRepo'; // Adjust import as necessary
import { sendResponse } from '../../../libraries';
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from '../../../constants';
import { Multer } from 'multer';
import { log } from 'console';

export default class FilesController {
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
            let files: any[] = [];

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
            if (req.files && req.files.length != 0) {
                files = req.files as Multer.File;

                // Process each file and upload it
                const uploadPromises = files.map(async (file: Multer.File, index: number) => {
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
