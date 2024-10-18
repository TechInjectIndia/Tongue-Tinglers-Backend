import { Request, Response } from 'express';

/**
 * Interface for Gallery Controller.
 */
interface IGalleryController<T> {
    /**
     * Upload a Image.
     * @param req - The Express request object.
     * @param res - The Express response object.
     */
    uploadImage(Image: any, destinationPath: string): Promise<string>

    /**
     * Get all uploaded Images.
     * @param req - The Express request object.
     * @param res - The Express response object.
     */
    getImages(prefix: string): Promise<any>

    /**
     * Delete a Image by ID.
     * @param req - The Express request object.
     * @param res - The Express response object.
     */
    deleteImage(ImageName: string): Promise<void>

    /**
     * Search for Images by name or message.
     * @param req - The Express request object.
     * @param res - The Express response object.
     */
    searchImages(name?: string, message?: string): Promise<any[]>
}

export default IGalleryController;
