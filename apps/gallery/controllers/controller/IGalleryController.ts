import { Request, Response } from 'express';
import { GalleryAttributes } from "../../../../interfaces";

/**
 * Interface for Files Controller.
 */
interface IGalleryController<T> {
    searchImages(name?: string, message?: string): Promise<T[]>;
    uploadImage(file: any, fileInfo: any, destinationPath: string): Promise<string>;
    getImages(prefix?: string): Promise<T[]>;
    get(id: string): Promise<any>
    deleteImage(imageName: string): Promise<void>;
    update(id: string, file: any, fileInfo: any, destinationPath: string): Promise<any>
}

export default IGalleryController;
