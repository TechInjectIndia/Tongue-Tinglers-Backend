import { NextFunction, Request, Response } from "express";
const axios = require('axios');
import { ZohoSignRepo } from '../models/zohosign';

const { ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN, ZOHO_API_BASE_URL } = process.env;

export default class ZohoSignController {
    static async oAuthCallback(req: Request, res: Response, next: NextFunction) {
        const redirectUri = 'http://localhost:3001/api/zoho-sign/oauth/callback'; // Replace with your registered redirect URI

        const authorizationCode = req.query.code;
        console.log(authorizationCode)
        try {
            // const response = await axios.post('https://accounts.zoho.com/oauth/v2/token', null, {
            //     params: {
            //         grant_type: 'authorization_code',
            //         client_id: ZOHO_CLIENT_ID,
            //         client_secret: ZOHO_CLIENT_SECRET,
            //         redirect_uri: redirectUri,
            //         code: authorizationCode
            //     }
            // });
            // console.log(response);

            // const accessToken = response.data.access_token;
            // console.log(accessToken);
            // res.send('Authorization successful!', accessToken);

        } catch (error) {
            console.error('Error sending document for signing:', error);
        }
    }

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

            const accessToken = '1000.fb032a7321fdf9a1a59575a9b373a21d.21fed82aa6f92c433d75890f9c99a518';
            const response = await axios.post(`${ZOHO_API_BASE_URL}documents`, documentDetails, {
                headers: {
                    'Authorization': `Zoho-oauthtoken ${accessToken}`,
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