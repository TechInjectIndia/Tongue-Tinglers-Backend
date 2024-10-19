import { Request, Response } from 'express';

/**
 * Interface for Files Controller.
 */
interface IFileController {
    /**
     * Upload a file.
     * @param req - The Express request object containing file data.
     * @param res - The Express response object.
     */
    uploadFile(req: Request, res: Response): Promise<void>;

    /**
     * Retrieve all uploaded files.
     * @param req - The Express request object.
     * @param res - The Express response object.
     */
    getFiles(req: Request, res: Response): Promise<void>;

    /**
     * Delete a file by its name.
     * @param req - The Express request object containing the file name to delete.
     * @param res - The Express response object.
     */
    deleteFile(req: Request, res: Response): Promise<void>;

    /**
     * Search for files based on optional parameters.
     * @param req - The Express request object containing search parameters.
     * @param res - The Express response object.
     */
    searchFiles(req: Request, res: Response): Promise<void>;
}

export default IFileController;
