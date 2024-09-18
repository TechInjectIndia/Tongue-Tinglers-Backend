import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../libraries";
import { ERROR_MESSAGE, RESPONSE_TYPE } from "../constants";
import { verifyFirebaseToken, getUserByFirebaseUid } from '../libraries';
import { UserModel } from '../database/schema/user/user.model';
import { RolesModel } from '../database/schema/admin-roles';

const roles = { admin: ['read'], user: ['read'] };

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const idToken = req.headers.authorization?.split('Bearer ')[1];
    if (!idToken)
        return res.status(401).send(
            sendResponse(
                RESPONSE_TYPE.ERROR,
                ERROR_MESSAGE.UNAUTHORIZED_REQUEST
            )
        );
    try {
        const decodedToken = await verifyFirebaseToken(idToken);
        if (decodedToken && decodedToken?.user_id) {
            const user = await getUserByFirebaseUid(decodedToken?.user_id);
            if(user){
                (req as any).firebase_uid = decodedToken?.user_id;
                (req as any).user_id = user?.id;
                next();
            }else{
                return res.status(401).send(
                    sendResponse(
                        RESPONSE_TYPE.ERROR,
                        ERROR_MESSAGE.UNAUTHORIZED_REQUEST
                    )
                );
            }
        } else {
            return res.status(401).send(
                sendResponse(
                    RESPONSE_TYPE.ERROR,
                    ERROR_MESSAGE.UNAUTHORIZED_REQUEST
                )
            );
        }
    } catch (err) {
        return res.status(400).send(ERROR_MESSAGE.INVALID_TOKEN);
    }
};

export const hasPermission = (permissionName: string, permission: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        next();
        // const user_id = (req as any).user_id;
        // const role_id = await UserModel.findOne({
        //     attributes: ['role'],
        //     where: {
        //         id: user_id
        //     }
        // });
        // if (role_id?.role) {
        //     const role = await RolesModel.findOne({
        //         attributes: ['role_permissions'],
        //         where: {
        //             id: role_id?.role
        //         }
        //     });
        //     if (role?.role_permissions) {
        //         let permissions = role?.role_permissions;
        //         permissions = JSON.stringify(permissions);
        //         permissions = JSON.parse(permissions);
        //         if (!permissions || typeof permissions[permissionName] == 'undefined' || !permissions[permissionName]?.includes(permission)) {
        //             res.status(403).send('Forbidden');
        //         } else {
        //             next();
        //         }
        //     }
        // } else {
        //     res.status(403).send('Forbidden');
        // }
    };
}