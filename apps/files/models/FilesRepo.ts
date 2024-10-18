import { uploadFileToFirebase, getAllFilesFromFirebase, deleteFileFromFirebase } from '../../../libraries'; // Adjust import path as necessary
import { FileModel } from "../../../database/schema";
import { Op } from "sequelize";

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

    // Uploads a file to Firebase Storage and saves the file data in the database
    public async uploadFile(file: any, destinationPath: string): Promise<string> {
        const urlArray = await uploadFileToFirebase(file, destinationPath);
        const url = urlArray[0];

        const newFile = await FileModel.create({
            name: file.name,
            message: file.message,
            url: url,
            recommended: file.recommended
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
