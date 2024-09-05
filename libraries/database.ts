import { UserModel } from '../database/schema/user/user.model';

export const getUserByFirebaseUid = async (firebaseUid: string) => {
    return await UserModel.findOne({
        where: {
            firebaseUid
        },
    });
}
