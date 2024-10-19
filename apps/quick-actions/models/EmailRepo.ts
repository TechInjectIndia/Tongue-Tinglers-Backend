import { EmailLogModel } from '../../../database/schema';

export type TEmailLogPayload = {
    to: string;
    subject: string;
    body: string;
    sentAt?: Date;
};

export class EmailRepo {
    static async create(data: TEmailLogPayload): Promise<void> {
        try {
            await EmailLogModel.create(data);
            console.log('Email log created successfully.');
        } catch (error) {
            console.error('Error creating email log:', error);
            throw error;
        }
    }
}
