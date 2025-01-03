import { UserModel } from "apps/user/models/UserTable";

export const getUserByFirebaseUid = async (firebaseUid: string) => {
    return await UserModel.findOne({
        where: {
            firebaseUid
        },
    });
}
