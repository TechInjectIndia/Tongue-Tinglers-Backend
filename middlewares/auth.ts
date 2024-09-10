const axios = require('axios');
import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../libraries";
import { ERROR_MESSAGE, RESPONSE_TYPE } from "../constants";
import { verifyFirebaseToken, getUserByFirebaseUid } from '../libraries';
const { ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN, ZOHO_API_BASE_URL } = process.env;

const roles = { admin: ['read'], user: ['read'] };

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
        if (decodedToken && decodedToken?.user_id) {
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

// Authentication ZOHO
// export const getAccessTokenZoho = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const response = await axios.post('https://accounts.zoho.com/oauth/v2/token', null, {
//             params: {
//                 refresh_token: ZOHO_REFRESH_TOKEN,
//                 client_id: ZOHO_CLIENT_ID,
//                 client_secret: ZOHO_CLIENT_SECRET,
//                 grant_type: 'refresh_token',
//             }
//         });
//         return response.data.access_token;
//     } catch (error) {
//         console.error('Error getting access token:', error.response ? error.response.data : error.message);
//         throw error;
//     }
// }

// With the access token, you can make requests to the Zoho DocSign API. 
// async function sendDocumentForSigning(documentDetails) {
//     try {
//       const accessToken = await getAccessToken();
//       const response = await axios.post(`${ZOHO_API_BASE_URL}/v1/documents`, documentDetails, {
//         headers: {
//           'Authorization': `Bearer ${accessToken}`,
//           'Content-Type': 'application/json'
//         }
//       });
//       console.log('Document sent for signing:', response.data);
//     } catch (error) {
//       console.error('Error sending document for signing:', error.response ? error.response.data : error.message);
//     }
//   }
  
//   // Example usage
//   const documentDetails = {
//     document_id: '1234567890',
//     recipients: [
//       {
//         email: 'recipient@example.com',
//         name: 'John Doe',
//         signers: [
//           {
//             page: 1,
//             x: 100,
//             y: 200,
//             type: 'SIGNATURE'
//           }
//         ]
//       }
//     ]
//   };
  
//   sendDocumentForSigning(documentDetails);


// Example of Retrieving Document Status
// async function getDocumentStatus(documentId) {
//     try {
//       const accessToken = await getAccessToken();
//       const response = await axios.get(`${ZOHO_API_BASE_URL}/v1/documents/${documentId}`, {
//         headers: {
//           'Authorization': `Bearer ${accessToken}`
//         }
//       });
//       console.log('Document status:', response.data);
//     } catch (error) {
//       console.error('Error retrieving document status:', error.response ? error.response.data : error.message);
//     }
//   }
  
//   // Example usage
//   const documentId = '1234567890';
//   getDocumentStatus(documentId);