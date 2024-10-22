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
            const files = req.files as Multer.File;
            // const files = req.body.files as Multer.File;
            let fileDetails = req.body.fileDetails;

            // Check if files were uploaded
            if (!files || files.length === 0) {
                return res.status(400).send({
                    message: "No files uploaded.",
                });
            }

            let parsedFileDetails: any[] = [];
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

            // Check if the length of both arrays matches
            if (files.length !== parsedFileDetails.length) {
                return res.status(400).send({
                    error: true,
                    message: 'The number of files must match the number of file details provided.',
                });
            }

            // Process each file and upload it
            const uploadPromises = files.map(async (file: Multer.File, index: number) => {
                const details = parsedFileDetails[index];
                const fileInfo = {
                    originalname: file.originalname,
                    message: details.message || '',
                    name: details.name || '',
                    recommended: details.recommended === 'true',
                };

                const url = await new FilesRepo().uploadFile(file, fileInfo, 'uploads');
                return { originalname: file.originalname, url, recommended: fileInfo.recommended };
            });

            const uploadResults = await Promise.all(uploadPromises);

            // Return the response with URLs and details
            return res.status(200).send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.UPLOADED, { uploadResults }));
        } catch (err) {
            console.error("Error uploading files:", err);
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
