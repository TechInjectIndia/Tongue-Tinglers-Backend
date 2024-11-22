import { uploadFileToFirebase, getAllFilesFromFirebase, deleteFileFromFirebase } from '../../../libraries'; // Adjust import path as necessary
import { FileModel } from "../../../database/schema";
import { Op } from "sequelize";
import {
    ICampaignSubmisisons,
} from "../../../interfaces";

export class FilesRepo {
    public async searchFiles(name?: string, message?: string): Promise<any[]> {
        const searchConditions: any = {};

        if (name) {
            searchConditions.name = { [Op.like]: `%${name}%` };
        }
        if (message) {
            searchConditions.message = { [Op.like]: `%${message}%` };
        }

        if (!name && !message) {
            searchConditions.recommended = true;
        }

        try {
            const files = await FileModel.findAll({
                where: searchConditions,
            });
            return files;
        } catch (error) {
            console.error('Error searching files:', error);
            throw new Error('Failed to search files.');
        }
    }

    public async update(id: number, data: any): Promise<any> {
        const existingFile = await FileModel.findByPk(id);

        if (!existingFile) {
            throw new Error(`File with ID ${id} not found.`);
        }

        const updatedFile = await existingFile.update({
            name: data.name,
            message: data.message,
            recommended: data.recommended,
            url: data.url || existingFile.url,
            updatedAt: new Date(),
        });

        return updatedFile;
    }

    public async create(data: any): Promise<any> {
        const response = await FileModel.create({
            name: data.name,
            message: data.message,
            recommended: data.recommended
        });
        return response;
    }

    public async get(id: number): Promise<any> {
        const data = await FileModel.findOne({
            where: {
                id,
            },
        });
        return data;
    }

    public async updateFile(
        id: number,
        file: any,
        fileInfo: any,
        destinationPath: string
    ): Promise<any> {
        const urlArray = await uploadFileToFirebase(file, destinationPath);
        const url = urlArray[0];

        // Check if the file already exists in the database by name or other identifier
        const existingFile = await FileModel.findOne({
            where: { name: fileInfo.name },
        });


        const updatedFile = await FileModel.update({
            name: fileInfo.name,
            message: fileInfo.message,
            recommended: fileInfo.recommended,
            url: url || existingFile.url,
            updatedAt: new Date(),
        }, { where: { id: id } });

        return updatedFile;
    }

    // Uploads a file to Firebase Storage and saves the file data in the database
    public async uploadFile(file: any, fileInfo: any, destinationPath: string): Promise<string> {
        const urlArray = await uploadFileToFirebase(file, destinationPath);
        const url = urlArray[0];

        const newFile = await FileModel.create({
            name: fileInfo.name,
            message: fileInfo.message,
            url: url,
            recommended: fileInfo.recommended
        });

        return newFile.url;
    }

    // Retrieve uploaded files (List files from Firebase and the database)
    public async getFiles(prefix: string = ''): Promise<any> {
        // const files = await getAllFilesFromFirebase(prefix); 

        const dbFiles = await FileModel.findAll();

        return dbFiles;
    }

    // Delete a file by its name in Firebase and the database
    public async deleteFile(fileName: string): Promise<void> {
        await deleteFileFromFirebase(fileName);
        await FileModel.destroy({ where: { name: fileName } });
    }
}
