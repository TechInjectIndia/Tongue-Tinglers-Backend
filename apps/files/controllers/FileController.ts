import { Request, Response } from 'express';
import { FilesRepo } from '../models/FilesRepo'; // Adjust import as necessary
import { sendResponse } from '../../../libraries';
import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from '../../../constants';

export default class FilesController {

    // Upload files
    static async uploadFile(req: Request, res: Response) {
        try {
            const files = req.files; // Handle multiple files
            // Check if files were uploaded
            if (!files || files.length === 0) {
                return res.status(400).send({
                    message: "No files uploaded.",
                });
            }

            // Process each file upload
            const urls = await Promise.all(files.map(async (file) => {
                const url = await new FilesRepo().uploadFile(file, 'uploads'); // Specify destination path
                return url; // Return the URL for each uploaded file
            }));

            return res.status(200).send(sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.UPLOADED, { urls }));
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
