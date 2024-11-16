import { uploadFileToFirebase, getAllFilesFromFirebase, deleteFileFromFirebase } from '../../../libraries';
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

    public async get(id: string): Promise<any> {
        const data = await GalleryModel.findOne({
            where: {
                id,
            },
        });
        return data;
    }

    // Upload an image to Firebase Storage and save the image data in the database
    public async uploadImage(file: any, fileInfo: any, destinationPath: string): Promise<string> {
        const urlArray = await uploadFileToFirebase(file, destinationPath);
        const url = urlArray[0];

        const newImage = await GalleryModel.create({
            name: fileInfo.name,
            message: fileInfo.message,
            url: url,
            caption: fileInfo.caption
        });

        return newImage.url;
    }

    public async update(id: string, data: any): Promise<any> {
        const existingFile = await GalleryModel.findByPk(id);

        if (!existingFile) {
            throw new Error(`File with ID ${id} not found.`);
        }

        const updatedFile = await existingFile.update({
            name: data.name,
            message: data.message,
            url: data.url || existingFile.url,
            caption: data.caption,
            updatedAt: new Date(),
        });

        return updatedFile;
    }

    public async updateFile(
        id: string,
        file: any,
        fileInfo: any,
        destinationPath: string
    ): Promise<any> {
        const urlArray = await uploadFileToFirebase(file, destinationPath);
        const url = urlArray[0];

        // Check if the file already exists in the database by name or other identifier
        const existingFile = await GalleryModel.findOne({
            where: { name: fileInfo.name },
        });

        const updatedFile = await GalleryModel.update({
            name: fileInfo.name,
            message: fileInfo.message,
            url: url || existingFile.url,
            caption: fileInfo.caption,
            updatedAt: new Date(),
        }, { where: { id: id } });

        return updatedFile;
    }

    // Retrieve uploaded images (List images from Firebase and the database)
    public async getImages(prefix: string = ''): Promise<any[]> {
        // const firebaseImages = await getAllFilesFromFirebase(prefix); 
        const dbImages = await GalleryModel.findAll();
        return dbImages;
    }

    // Delete an image by its name in Firebase and the database
    public async deleteImage(imageName: string): Promise<void> {
        await deleteFileFromFirebase(imageName);
        await GalleryModel.destroy({ where: { name: imageName } });
    }
}
