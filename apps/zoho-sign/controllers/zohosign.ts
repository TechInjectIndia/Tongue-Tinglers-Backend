import { NextFunction, Request, Response } from "express";
const axios = require('axios');
import { ZohoSignRepo } from '../models/zohosign';
import { sendResponse } from "../../../libraries";

const { ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REDIRECT_URI, ZOHO_AUTH_URL, ZOHO_TOKEN_URL, ZOHO_API_URL } = process.env;

export default class ZohoSignController {
    static async createDocument(req: Request, res: Response, next: NextFunction) {
        // const { name, recipients, templateId, redirectUrl } = {
        //     name: "Sample Document",
        //     recipients: [
        //         {
        //             "name": "John Doe",
        //             "email": "john.doe@example.com",
        //             "role": "Signer",
        //             "signingOrder": 1,
        //             "signatureType": "TEXT"
        //         }
        //     ],
        //     templateId: null,
        //     redirectUrl: "http://localhost:3000/zoho/callback"
        // };
        // // Basic validation
        // if (!name || !recipients) {
        //     return res.status(400).json({ message: 'Missing required fields' });
        // }
        // const documentData = {
        //     name,
        //     recipients,
        //     templateId: templateId || null,
        //     redirectUrl
        // };
        const accessToken = await new ZohoSignRepo().getAccessTokenZoho();
        try {
            const response = await axios.post(
                `https://sign.zoho.com/api/v1/documents`,
                // documentData, // Document data
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(response.data.message);
            res.json(response);
        } catch (error) {
            console.log(error);
            res.status(500).json(error.response.data.message);
        }
    };

    static async getDocuments(req: Request, res: Response, next: NextFunction) {
        const accessToken = await new ZohoSignRepo().getAccessTokenZoho();
        try {
            const response = await axios.get(`${ZOHO_API_URL}/documents`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            res.json(response.data);
        } catch (error) {
            res.status(500).json(error.response.data);
        }
    };

    static async signDocument(req: Request, res: Response, next: NextFunction) {
        const documentId = '1212121212'; // Ensure accessToken and documentId are provided in request body
        const accessToken = await new ZohoSignRepo().getAccessTokenZoho();

        try {
            const response = await axios.post(
                `${ZOHO_API_URL}/documents/${documentId}/sign`,
                req.body, // Signing data
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            res.json(response.data);
        } catch (error) {
            res.status(500).json(error.response.data);
        }
    };

    static async getAccessToken(req: Request, res: Response, next: NextFunction) {
        const { code } = req.query;

        try {
            const accessToken = await new ZohoSignRepo().getAccessTokenZoho();

            const response = await axios.post(ZOHO_TOKEN_URL, null, {
                params: {
                    code,
                    grant_type: 'authorization_code',
                    client_id: ZOHO_CLIENT_ID,
                    client_secret: ZOHO_CLIENT_SECRET,
                    redirect_uri: ZOHO_REDIRECT_URI,
                },
            });

            res.json(response.data);
        } catch (error) {
            res.status(500).json(error.response.data);
        }
    };

    // static async sendDocumentForSigning(req: Request, res: Response, next: NextFunction) {
    //     try {
    //         const documentDetails = {
    //             document_id: '72565000000030063',
    //             recipients: [
    //                 {
    //                     email: 'jasskaranofficial@gmail.com',
    //                     name: 'jasskaranofficial',
    //                     signers: [
    //                         {
    //                             page: 1,
    //                             x: 100,
    //                             y: 200,
    //                             type: 'SIGNATURE'
    //                         }
    //                     ]
    //                 }
    //             ]
    //         };

    //         const accessToken = await new ZohoSignRepo().getAccessTokenZoho();
    //         console.log(accessToken)

    //         const response = await axios.post('https://sign.zoho.com/api/v1/documents', documentDetails, {
    //             headers: {
    //                 'Authorization': `Bearer ${accessToken}`,
    //             }
    //         });

    //         console.log('Document sent for signing:', response.data);
    //         return res
    //             .status(200)
    //             .send(
    //                 sendResponse(
    //                     "",
    //                     ""
    //                 )
    //             );
    //     } catch (error) {
    //         console.error('Error sending document for signing:', error);
    //     }
    // }

    // static async getDocumentStatus() {
    //     const documentId = '1234567890';
    //     try {
    //         const accessToken = await new ZohoSignRepo().getAccessTokenZoho();
    //         const response = await axios.get(`${ZOHO_API_BASE_URL}documents/${documentId}`, {
    //             headers: {
    //                 'Authorization': `Bearer ${accessToken}`
    //             }
    //         });
    //         console.log('Document status:', response.data);
    //     } catch (error) {
    //         console.error('Error retrieving document status:', error.response ? error.response.data : error.message);
    //     }
    // }
}