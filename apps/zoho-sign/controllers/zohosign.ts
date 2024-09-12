import { NextFunction, Request, Response } from "express";
const axios = require('axios');
import { ZohoSignRepo } from '../models/zohosign';
import { sendResponse } from "../../../libraries";

const { ZOHO_API_BASE_URL } = process.env;

export default class ZohoSignController {
    static async sendDocumentForSigning(req: Request, res: Response, next: NextFunction) {
        try {
            const documentDetails = {
                document_id: '72565000000030063',
                recipients: [
                    {
                        email: 'jasskaranofficial@gmail.com',
                        name: 'jasskaranofficial',
                        signers: [
                            {
                                page: 1,
                                x: 100,
                                y: 200,
                                type: 'SIGNATURE'
                            }
                        ]
                    }
                ]
            };

            const accessToken = await new ZohoSignRepo().getAccessTokenZoho();
            console.log(accessToken)
            
            const response = await axios.post('https://sign.zoho.com/api/v1/documents', documentDetails, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            console.log('Document sent for signing:', response.data);
            return res
                .status(200)
                .send(
                    sendResponse(
                        "",
                        ""
                    )
                );
        } catch (error) {
            console.error('Error sending document for signing:', error);
        }
    }

    static async getDocumentStatus() {
        const documentId = '1234567890';
        try {
            const accessToken = await new ZohoSignRepo().getAccessTokenZoho();
            const response = await axios.get(`${ZOHO_API_BASE_URL}documents/${documentId}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            console.log('Document status:', response.data);
        } catch (error) {
            console.error('Error retrieving document status:', error.response ? error.response.data : error.message);
        }
    }
}