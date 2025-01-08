import {deleteFileFromFirebase, uploadFileToFirebase} from '../../../libraries'; // Adjust import path as necessary
import {Op} from "sequelize";
import {FileModel} from './FileTable';
import { UserModel } from 'apps/user/models/UserTable';
import { ParsedQuickActionsFiles, QuickActionsFilesPayload } from '../interface/Files';
import { parseFile } from '../parser/fileParser';

export class FilesRepo {
    public async searchFiles(name?: string, message?: string): Promise<ParsedQuickActionsFiles[]> {
        const searchConditions: any = {};

        if (name) {
            searchConditions.name = {[Op.iLike]: `%${name}%`};
        }
        if (message) {
            searchConditions.message = {[Op.iLike]: `%${message}%`};
        }

        if (!name && !message) {
            searchConditions.recommended = true;
        }

        try {
            const files = await FileModel.findAll({
                where: searchConditions,
                include: [
                    {
                        model: UserModel,
                        as: 'createdByUser'
                    },
                    {
                        model: UserModel,
                        as: 'updatedByUser'
                    },
                    {
                        model: UserModel,
                        as: 'deletedByUser'
                    }
                ]
            });
            const parsedFiles = await files.map((file)=> {
                return parseFile(file)
            })
            return parsedFiles
        }
        catch (error) {
            console.error('Error searching files:', error);
            throw new Error('Failed to search files.');
        }
    }

    public async update(id: number, data: any): Promise<QuickActionsFilesPayload> {
        const existingFile = await FileModel.findByPk(id);

        if (!existingFile) {
            throw new Error(`File with ID ${id} not found.`);
        }

        const updatedFile = await existingFile.update({
            name: data.name,
            message: data.message,
            subject: data.subject,
            url: data.url || existingFile.url,
            updatedAt: new Date(),
            status: data.status,
            updatedBy: data.updatedBy
        });

        return updatedFile;
    }

    public async create(data: any): Promise<QuickActionsFilesPayload> {
        const response = await FileModel.create({
            name: data.name,
            message: data.message,
            subject: data.subject,
            url: data.url,
            status: data.status || 'active',
            createdBy: data.createdBy,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null
        });
        return response;
    }

    public async get(id: number): Promise<ParsedQuickActionsFiles> {
        const data = await FileModel.findOne({
            where: {
                id,
            },
            include: [
                {
                    model: UserModel,
                    as: 'createdByUser'
                },
                {
                    model: UserModel,
                    as: 'updatedByUser'
                },
                {
                    model: UserModel,
                    as: 'deletedByUser'
                }
            ]
        });
        return parseFile(data);
    }

    public async updateFile(
        id: number,
        file: any,
        fileInfo: any,
        destinationPath: string
    ): Promise<any> {
        const urlArray = await uploadFileToFirebase(file, destinationPath);
        const url = urlArray[0];

        // Check if the file already exists in the database by name or other
        // identifier
        const existingFile = await FileModel.findOne({
            where: {name: fileInfo.name},
        });


        const updatedFile = await FileModel.update({
            name: fileInfo.name,
            message: fileInfo.message,
            // url: url || existingFile.url,
            updatedAt: new Date(),
            status: fileInfo.status,
            updatedBy: fileInfo.updatedBy
        }, {where: {id: id}});

        return updatedFile;
    }

    // Uploads a file to Firebase Storage and saves the file data in the
    // database
    public async uploadFile(file: any,
        destinationPath: string): Promise<string> {
        const urlArray = await uploadFileToFirebase(file, destinationPath);
        const url = urlArray[0];

        // const newFile = await FileModel.create({
        //     name: fileInfo.name,
        //     message: fileInfo.message,
        //     url: url,
        //     recommended: fileInfo.recommended
        // });

        return url
    }

    // Retrieve uploaded files (List files from Firebase and the database)
    public async getFiles(prefix: string = ''): Promise<ParsedQuickActionsFiles[]> {
        // const files = await getAllFilesFromFirebase(prefix);

        const dbFiles = await FileModel.findAll({
            include: [
                {
                    model: UserModel,
                    as: 'createdByUser'
                },
                {
                    model: UserModel,
                    as: 'updatedByUser'
                },
                {
                    model: UserModel,
                    as: 'deletedByUser'
                }
            ]
        });

        const parsedFiles = await dbFiles.map((file)=> {
            return parseFile(file)
        })
        return parsedFiles
    }

    // Delete a file by its name in Firebase and the database
    public async deleteFile(fileName: string): Promise<void> {
        await deleteFileFromFirebase(fileName);
        await FileModel.destroy({where: {name: fileName}});
    }
}
