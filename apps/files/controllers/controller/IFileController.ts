import { Request, Response } from 'express';

/**
 * Interface for Files Controller.
 */
interface IFileController {
    /**
     * Upload a file.
     * @param req - The Express request object.
     * @param res - The Express response object.
     */
    uploadFile(req: Request, res: Response): Promise<void>;

    /**
     * Get all uploaded files.
     * @param req - The Express request object.
     * @param res - The Express response object.
     */
    getFiles(req: Request, res: Response): Promise<void>;

    /**
     * Delete a file by ID.
     * @param req - The Express request object.
     * @param res - The Express response object.
     */
    deleteFile(req: Request, res: Response): Promise<void>;
}

export default IFileController;
