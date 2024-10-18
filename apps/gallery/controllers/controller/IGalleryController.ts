import { Request, Response } from 'express';

/**
 * Interface for Files Controller.
 */
interface IGalleryController<T> {
    searchImages(name?: string, message?: string): Promise<T[]>;
    uploadImage(file: any, destinationPath: string): Promise<string>;
    getImages(prefix?: string): Promise<T[]>;
    deleteImage(imageName: string): Promise<void>;
}

export default IGalleryController;
