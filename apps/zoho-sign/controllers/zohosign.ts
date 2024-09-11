import { NextFunction, Request, Response } from "express";
const axios = require('axios');
import { ZohoSignRepo } from '../models/zohosign';

const { ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN, ZOHO_API_BASE_URL } = process.env;

export default class ZohoSignController {

    static async sendDocumentForSigning(req: Request, res: Response, next: NextFunction) {
        try {
            const documentDetails = {
                document_id: '1234567890',
                recipients: [
                    {
                        email: 'lovepreetmatrixecho@gmail.com',
                        name: 'lovepreet',
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
            const response = await axios.post(`${ZOHO_API_BASE_URL}/documents`, documentDetails, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            });
            console.log('Document sent for signing:', response.data);
        } catch (error) {
            console.error('Error sending document for signing:', error);
        }
    }

    static async getDocumentStatus() {
        const documentId = '1234567890';
        try {
            const accessToken = await new ZohoSignRepo().getAccessTokenZoho();
            const response = await axios.get(`${ZOHO_API_BASE_URL}/documents/${documentId}`, {
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