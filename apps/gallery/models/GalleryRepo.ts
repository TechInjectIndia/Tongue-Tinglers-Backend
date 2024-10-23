import { uploadFileToFirebase, getAllFilesFromFirebase, deleteFileFromFirebase } from '../../../libraries'; // Adjust import path as necessary
import { GalleryModel } from "../../../database/schema";
import { Op } from "sequelize";
import { GalleryAttributes } from "../../../interfaces";
import IGalleryController from '../controllers/controller/IGalleryController';

export class GalleryRepo implements IGalleryController<GalleryAttributes> {
    // Search for images based on name and message
    public async searchImages(name?: string, message?: string): Promise<any[]> {
        const searchConditions: any = {};

        if (name) {
            searchConditions.name = { [Op.like]: `%${name}%` };
        }
        if (message) {
            searchConditions.message = { [Op.like]: `%${message}%` };
        }

        try {
            const images = await GalleryModel.findAll({
                where: searchConditions,
            });
            return images;
        } catch (error) {
            console.error('Error searching images:', error);
            throw new Error('Failed to search images.');
        }
    }

    // Upload an image to Firebase Storage and save the image data in the database
    public async uploadImage(file: any, destinationPath: string): Promise<string> {
        const urlArray = await uploadFileToFirebase(file, destinationPath);
        const url = urlArray[0];

        const newImage = await GalleryModel.create({
            name: file.name,
            message: file.message,
            url: url,
            caption: file.caption
        });

        return newImage.url;
    }

    // Retrieve uploaded images (List images from Firebase and the database)
    public async getImages(prefix: string = ''): Promise<any[]> {
        // const firebaseImages = await getAllFilesFromFirebase(prefix); 
        const dbImages = await GalleryModel.findAll();
        return dbImages;
    }

    public async update(id: string, data: GalleryAttributes): Promise<[affectedCount: number]> {
        return await GalleryModel.update(data, {
            where: {
                id,
            },
        });
    }

    // Delete an image by its name in Firebase and the database
    public async deleteImage(imageName: string): Promise<void> {
        await deleteFileFromFirebase(imageName);
        await GalleryModel.destroy({ where: { name: imageName } });
    }
}
