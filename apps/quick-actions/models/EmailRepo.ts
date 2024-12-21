import { EmailLogModel, UserModel } from '../../../database/schema';
import { getUserName } from '../../common/utils/commonUtils';

export type TEmailLogPayload = {
    to: string;
    subject: string;
    body: string;
    sentAt?: Date;
};

export class EmailRepo {
    static async create(data: TEmailLogPayload, userId: number): Promise<void> {
        try {
            const user = await UserModel.findByPk(userId);
            if(!user){
                throw new Error(`User with ID ${userId} not found.`);
            }
            await EmailLogModel.create(data, {
                userId: user.id,
                userName: getUserName(user)
            });
            console.log('Email log created successfully.');
        } catch (error) {
            console.error('Error creating email log:', error);
            throw error;
        }
    }
}
