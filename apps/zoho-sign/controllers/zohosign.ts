import { NextFunction, Request, Response } from "express";
const axios = require('axios');
import { ZohoSignRepo } from '../models/zohosign';
import { sendResponse } from "../../../libraries";
const FormData = require('form-data');
const fs = require('fs');

const { ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REDIRECT_URI, ZOHO_AUTH_URL, ZOHO_TOKEN_URL, ZOHO_API_URL } = process.env;

export default class ZohoSignController {
    static async createDocument(req: Request, res: Response, next: NextFunction) {
        const accessToken = await new ZohoSignRepo().getAccessTokenZoho();
        try {
            const jsonData = {
                "requests": {
                    "request_name": "New",
                    "actions": [
                        {
                            "action_type": "SIGN",
                            "recipient_email": "navdeepsaroya4@gmail.com",
                            "recipient_name": "navdeep",
                            "signing_order": "0",
                            "verify_recipient": true,
                            "verification_type": "EMAIL",
                            "verification_code": "123456",
                            "private_notes": ""
                        }
                    ],
                    "expiration_days": "1",
                    "is_sequential": true,
                    "email_reminders": true,
                    "reminder_period": 1,
                    "folder_id": "72565000000033001"
                }
            };

            let data = new FormData();
            data.append('data', JSON.stringify(jsonData));
            data.append('file', fs.createReadStream('C:\\Users\\hp\\Downloads\\intex.pdf'));

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ZOHO_API_URL}/requests`,
                headers: {
                    'Authorization': `Zoho-oauthtoken ${accessToken}`,
                },
                data: data
            };

            axios.request(config).then((response) => {
                console.log(JSON.stringify(response.data.message));
                res.status(200).json(response.data.message);
            }).catch((error) => {
                console.log(error);
            });
        } catch (error) {
            console.log(error.response);
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
        try {
            const accessToken = await new ZohoSignRepo().getAccessTokenZoho();
            const documentId = "72565000000033124";
            const reqId = "72565000000033123";
            const actionId = "72565000000033140";
            const jsonData = {
                "requests": {
                    "actions": [
                        {
                            "verify_recipient": false,
                            "action_id": actionId,
                            "action_type": "SIGN",
                            "private_notes": "",
                            "signing_order": 0,
                            "fields": {
                                "check_boxes": [
                                    {
                                        "field_name": "Checkbox-1",
                                        "field_label": "Checkbox",
                                        "field_type_name": "Checkbox",
                                        "document_id": documentId,
                                        "action_id": actionId,
                                        "is_mandatory": true,
                                        "x_coord": 100,
                                        "y_coord": 100,
                                        "abs_width": 40,
                                        "abs_height": 30,
                                        "page_no": 0,
                                        "default_value": true,
                                        "is_read_only": false,
                                        "description_tooltip": "You agree to this"
                                    }
                                ],
                            }
                        }
                    ]
                }
            }

            let data = new FormData();
            data.append('data', JSON.stringify(jsonData));

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ZOHO_API_URL}/requests/${reqId}/submit`,
                headers: {
                    'Authorization': `Zoho-oauthtoken ${accessToken}`,
                },
                data: data
            };

            axios.request(config).then((response) => {
                console.log(JSON.stringify(response.data.message));
                res.status(200).json(response.data.message);
            }).catch((error) => {
                console.log(error);
            });
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

}