import { NextFunction, Request, Response } from "express";
const axios = require('axios');
import { ZohoSignRepo } from '../models/zohosign';
import { AdminRepo } from '../../admin-user/models/user';
import { sendResponse } from "../../../libraries";
const FormData = require('form-data');
const fs = require('fs');

const { ZOHO_API_URL } = process.env;

export default class ZohoSignController {
    static async sendDocumentUsingTemplate(req: Request, res: Response, next: NextFunction) {
        const accessToken = await new ZohoSignRepo().getAccessTokenZoho();
        try {
            const templateId = "72565000000032727";
            const franchiseId = "72565000000032727";
            const franchiseDetails = await new AdminRepo().get(franchiseId as string)
            const getTemplate = await new ZohoSignRepo().getTemplates(templateId as string);
            const jsonData = {
                "templates": {
                    "field_data": {
                        "field_text_data": {
                            'franchisee': 'sign'
                        },
                        "field_boolean_data": {},
                        "field_date_data": {},
                        "field_radio_data": {}
                    },
                    "actions": [
                        {
                            "recipient_name": "lovepreet",
                            "recipient_email": "lovepreetmatrixecho@gmail.com",
                            "action_id": getTemplate.templates.actions[0].action_id,
                            "action_type": getTemplate.templates.actions[0].action_type,
                            "signing_order": 1,
                            "verify_recipient": "false",
                            "private_notes": ""
                        }
                    ],
                    "notes": ""
                }
            };

            let data = new FormData();
            data.append('data', JSON.stringify(jsonData));

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ZOHO_API_URL}/templates/${templateId}/createdocument`,
                headers: {
                    'Authorization': `Zoho-oauthtoken ${accessToken}`,
                },
                data: data
            };

            axios.request(config).then((response) => {
                res.status(200).json(response.data.message);
            }).catch((error) => {
                console.log(error);
            });
        } catch (error) {
            res.status(500).json(error.response.data.message);
        }
    };

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
                    "expiration_days": "10",
                    "is_sequential": true,
                    "email_reminders": true,
                    "reminder_period": 1,
                    "folder_id": "72565000000033001"
                }
            };

            let data = new FormData();
            data.append('data', JSON.stringify(jsonData));
            data.append('file', fs.createReadStream('C:\\Users\\hp\\Downloads\\Matrix_PRD_TongueTinglers2024.pdf'));

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
}