import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../libraries";
import { ERROR_MESSAGE, RESPONSE_TYPE } from "../constants";
import { verifyFirebaseToken, getUserByFirebaseUid } from '../libraries';

const roles = {
    admin: ['read'],
    user: ['read'],
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const idToken = req.headers.authorization?.split('Bearer ')[1];
    if (!idToken)
        return res
            .status(401)
            .send(
                sendResponse(
                    RESPONSE_TYPE.ERROR,
                    ERROR_MESSAGE.UNAUTHORIZED_REQUEST
                )
            );
    try {
        const decodedToken = await verifyFirebaseToken(idToken);
        if(decodedToken && decodedToken?.user_id){
            const user = await getUserByFirebaseUid(decodedToken?.user_id);
            (req as any).firebase_uid = decodedToken?.user_id;
            (req as any).user_id = user?.id;
            next();
        }
    } catch (err) {
        return res.status(400).send(ERROR_MESSAGE.INVALID_TOKEN);
    }
};

export function hasPermission(userRole: string, permission: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        const permissions = roles[userRole] || [];
        if (permissions.includes(permission)) {
            return next();
        }
        res.status(403).send('Forbidden');
    };
}