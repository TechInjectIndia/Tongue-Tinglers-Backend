import { uploadFileToFirebase, getAllFilesFromFirebase, deleteFileFromFirebase } from '../../../libraries'; // Adjust import path as necessary
import { FileModel } from "../../../database/schema";

export class FilesRepo {
    // Constructor (bucket initialization is done globally)
    constructor() {
        // The bucket is already initialized in the global context
    }

    // Uploads a file to Firebase Storage and saves the file data in the database
    public async uploadFile(file: any, destinationPath: string): Promise<string> {
        // Call the function to upload the file to Firebase
        const urlArray = await uploadFileToFirebase(file, destinationPath);
        const url = urlArray[0]; // Get the first element of the signed URL array

        // Save the file details in the database
        const newFile = await FileModel.create({
            name: file.originalname, // File name
            url: url, // URL of the file from Firebase
        });

        return newFile.url; // Return the saved URL
    }

    // Retrieve uploaded files (List files from Firebase and the database)
    public async getFiles(prefix: string = ''): Promise<any> {
        // const files = await getAllFilesFromFirebase(prefix); // Use the function to get file details from Firebase

        // Optionally, you can also fetch files from your database if you want:
        const dbFiles = await FileModel.findAll();

        return dbFiles; // Return list of file details (or combine with dbFiles if needed)
    }

    // Delete a file by its name in Firebase and the database
    public async deleteFile(fileName: string): Promise<void> {
        // Delete the file from Firebase
        await deleteFileFromFirebase(fileName);

        // Delete the file from the database
        await FileModel.destroy({ where: { name: fileName } });
    }
}
