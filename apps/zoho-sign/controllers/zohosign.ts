import { NextFunction, Request, Response } from "express";
const axios = require('axios');
import { ZohoSignRepo } from '../models/zohosign';
import { sendResponse } from "../../../libraries";
const FormData = require('form-data');

const { ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REDIRECT_URI, ZOHO_AUTH_URL, ZOHO_TOKEN_URL, ZOHO_API_URL } = process.env;

export default class ZohoSignController {
    static async createDocument(req: Request, res: Response, next: NextFunction) {
        const { name, recipients, templateId, redirectUrl } = {
            name: "Sample Document",
            recipients: [
                {
                    "name": "John Doe",
                    "email": "john.doe@example.com",
                    "role": "Signer",
                    "signingOrder": 1,
                    "signatureType": "TEXT"
                }
            ],
            templateId: null,
            redirectUrl: "http://localhost:3000/zoho/callback"
        };
        // Basic validation
        if (!name || !recipients) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const documentData = {
            name,
            recipients,
            templateId: templateId || null,
            redirectUrl
        };
        // let data_string = 'data='.urlencode('{"page_context":{"row_count":10,"start_index":1,"search_columns":{},"sort_column":"created_time","sort_order":"DESC"}}'');
        const accessToken = await new ZohoSignRepo().getAccessTokenZoho();
        console.log(accessToken)
        try {
            const response = await axios.post(
                `https://sign.zoho.com/api/v1/documents`,
                // documentData, // Document data
                {
                    headers: {
                        Authorization: `Zoho-oauthtoken ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(response.data.message);
            res.json(response);
        } catch (error) {
            console.log(error.response.data);
            res.status(500).json(error.response.data.message);
        }
    };

    static async getDocuments(req: Request, res: Response, next: NextFunction) {
        const accessToken = await new ZohoSignRepo().getAccessTokenZoho();
        console.log(accessToken)
        try {
            const response = await axios.get(`${ZOHO_API_URL}/requests`, {
                headers: {
                    Authorization: `Zoho-oauthtoken ${accessToken}`,
                },
            });
            res.json(response.data);
        } catch (error) {
            res.status(500).json(error.response.data);
        }
    };

    static async signDocument(req: Request, res: Response, next: NextFunction) {
        const documentId = '72565000000030049'; // Ensure accessToken and documentId are provided in request body
        // const data = {
        //     "requests": {
        //         "document_ids": [
        //             "72565000000030049" // Replace with your document ID
        //         ],
        //         "recipients": [
        //             {
        //                 "email": "jasskaranofficial@gmail.com", // Email of the first recipient
        //                 "name": "Recipient One",
        //                 "action_type": "SIGNATURE",
        //                 "signing_order": '1'
        //             }
        //         ],
        //         "actions": [
        //             {
        //                 "action_id": "72565000000030071", // Unique action ID
        //                 "action_type": "SIGNATURE",
        //                 "signing_order": '1',
        //                 "fields": [
        //                     {
        //                         "field_type_name": "SIGNATURE",
        //                         "text_property": {
        //                             "font": "Arial",
        //                             "font_size": '12',
        //                             "font_color": "black",
        //                             "max_field_length": '255',
        //                             "is_bold": 'false',
        //                             "is_italic": 'false'
        //                         },
        //                         "field_category": "SIGNATURE",
        //                         "field_label": "Signature",
        //                         "is_mandatory": 'true',
        //                         "page_no": '1',
        //                         "document_id": "72565000000030049", // Replace with your document ID
        //                         "field_name": "signature_field_1",
        //                         "y_coord": '150',
        //                         "x_coord": '200',
        //                         "abs_width": '100',
        //                         "abs_height": '50'
        //                     }
        //                 ]
        //             },
        //             {
        //                 "action_id": "72565000000030081", // Unique action ID
        //                 "action_type": "SIGNATURE",
        //                 "signing_order": '2',
        //                 "fields": [
        //                     {
        //                         "field_type_name": "SIGNATURE",
        //                         "text_property": {
        //                             "font": "Arial",
        //                             "font_size": '12',
        //                             "font_color": "black",
        //                             "max_field_length": '255',
        //                             "is_bold": 'false',
        //                             "is_italic": 'false'
        //                         },
        //                         "field_category": "SIGNATURE",
        //                         "field_label": "Signature",
        //                         "is_mandatory": 'true',
        //                         "page_no": '1',
        //                         "document_id": "72565000000030049",
        //                         "field_name": "signature_field_2",
        //                         "y_coord": '250',
        //                         "x_coord": '200',
        //                         "abs_width": '100',
        //                         "abs_height": '50'
        //                     }
        //                 ]
        //             }
        //         ]
        //     }
        // }

        const data={
            "requests": {
                "request_name": "NDA",
                "description": "Details of document",
                "is_sequential": true,
                "actions": [
                    {
                        "action_type": "SIGN",
                        "recipient_email": "navdeepmatrixecho@gmail.com",
                        "recipient_name": "Alex James",
                        "signing_order": 0,
                        "verify_recipient": true,
                        "verification_type": "EMAIL",
                        "private_notes": "To be signed"
                    },
                    {
                        "action_type": "INPERSONSIGN",
                        "recipient_email": "lovepreetmatrixecho@gmail.com",
                        "recipient_name": "Alex James",
                        "in_person_name": "David",
                        "in_person_email": "lovepreetmatrixecho@gmail.com",
                        "signing_order": 1,
                        "verify_recipient": false,
                        "private_notes": "Sign as Inperson"
                    }
                ],
                "expiration_days": 10,
                "email_reminders": true,
                "reminder_period": 2,
                "notes": "Note for all recipients"
            }
        }

        const accessToken = await new ZohoSignRepo().getAccessTokenZoho();
        console.log(accessToken)
        try {
            const response = await axios.post(
                // `${ZOHO_API_URL}/documents/${documentId}/sign`,
                `${ZOHO_API_URL}/requests`,
                // documentDetails, // Signing data
                data,
                {
                    headers: {
                        Authorization: `Zoho-oauthtoken ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            res.json(response.data);
        } catch (error) {
            // console.log(error);
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