import { NextFunction, Request, Response } from "express";
const axios = require('axios');
import { ZohoSignRepo } from '../models/zohosign';
import { AdminRepo } from '../../admin-user/models/user';
import { sendResponse } from "../../../libraries";
import { get, isEmpty } from "lodash";
import FormData from 'form-data';
import fs from 'fs';
import crypto from 'crypto';

const { ZOHO_API_URL, ZOHO_WEBHOOK_SECRET } = process.env;

export default class ZohoSignController {

    // Validate sign for webhook
    static async validateSignature(req: Request, res: Response, next: NextFunction) {
        // Function to validate the HMAC signature
        const receivedSignature = req.headers['x-zoho-sign-webhook-signature'];
        const computedSignature = crypto.createHmac('sha256', ZOHO_WEBHOOK_SECRET).update(JSON.stringify(req.body)).digest('hex');

        if (receivedSignature === computedSignature) {
            next(); // Signature is valid, proceed to the handler
        } else {
            res.status(400).send('Invalid signature');
        }
    }

    // Webhook endpoint
    static async callback(req: Request, res: Response, next: NextFunction) {
        const payload = req.body;

        // Extract and process notifications data
        const notifications = payload.notifications || {};
        const performedByEmail = notifications.performed_by_email;
        const performedByName = notifications.performed_by_name;
        const performedAt = notifications.performed_at;
        const reason = notifications.reason;
        const activity = notifications.activity;
        const operationType = notifications.operation_type;
        const actionId = notifications.action_id;
        const ipAddress = notifications.ip_address;

        // Convert timestamp from milliseconds to a Date object
        const performedAtDate = new Date(performedAt);

        // Log the data
        console.log(`Operation performed by: ${performedByName} (${performedByEmail})`);
        console.log(`Timestamp: ${performedAtDate}`);
        console.log(`Reason: ${reason}`);
        console.log(`Activity: ${activity}`);
        console.log(`Operation Type: ${operationType}`);
        console.log(`Action ID: ${actionId}`);
        console.log(`IP Address: ${ipAddress}`);

        // Extract and process requests data
        const requests = payload.requests || {};
        const requestName = requests.request_name;
        const requestId = requests.request_id;
        const documentIds = requests.document_ids || [];

        // Log the requests data
        console.log(`Request Name: ${requestName}`);
        console.log(`Request ID: ${requestId}`);

        documentIds.forEach(doc => {
            const documentName = doc.document_name;
            const documentId = doc.document_id;
            console.log(`Document Name: ${documentName}`);
            console.log(`Document ID: ${documentId}`);
        });

        // Handle different operation types
        switch (operationType) {
            case 'RequestSubmitted':
                console.log('A new request has been submitted.');
                break;
            case 'RequestViewed':
                console.log('A request has been viewed.');
                break;
            case 'RequestSigningSuccess':
                console.log('A document has been signed successfully.');
                break;
            case 'RequestCompleted':
                console.log('The request has been completed.');
                break;
            case 'RequestRejected':
                console.log('The request has been rejected.');
                break;
            case 'RequestRecalled':
                console.log('The request has been recalled.');
                break;
            case 'RequestForwarded':
                console.log('The request has been forwarded to another person.');
                break;
            case 'RequestExpired':
                console.log('The request has expired.');
                break;
            default:
                console.log('Unknown operation type.');
                break;
        }

        // Respond to acknowledge receipt
        res.json({ status: 'success' });
    };

    // Send document to franchise using template
    static async sendDocumentUsingTemplate(req: Request, res: Response, next: NextFunction) {
        const accessToken = await new ZohoSignRepo().getAccessTokenZoho();
        try {
            const templateId = get(req?.body, "templateId", '');
            const franchiseId = get(req?.body, "franchiseId", '');
            const recipientName = get(req?.body, "recipientName", '');
            const recipientEmail = get(req?.body, "recipientEmail", '');
            let prefilledValues = get(req?.body, "prefilledValues", '');

            const franchiseDetails = await new AdminRepo().get(franchiseId as string)
            if (!franchiseDetails) {
                res.status(403).json('No franchise found');
            }

            const getTemplate = await new ZohoSignRepo().getTemplate(templateId as string);
            if (!getTemplate) {
                res.status(403).json('No template found');
            }
            const jsonData = {
                "templates": {
                    "field_data": {
                        "field_text_data": {},
                        "field_boolean_data": {},
                        "field_date_data": {},
                        "field_radio_data": {}
                    },
                    "actions": [
                        {
                            "recipient_name": recipientName,
                            "recipient_email": recipientEmail,
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

            // Populate field_text_data in jsonData
            if (getTemplate?.templates?.document_fields[0]?.fields) {
                const docFields = getTemplate?.templates?.document_fields[0]?.fields;
                prefilledValues = JSON.parse(prefilledValues);
                docFields.forEach(field => {
                    const fieldLabel = field.field_label; // "Name-:", "Signature-:", "Date-:"
                    const fieldValue = prefilledValues[fieldLabel] || ''; // Get the prefilled value

                    if (field.field_category === 'textfield') {
                        jsonData.templates.field_data.field_text_data[fieldLabel] = fieldValue;
                    }
                });
            }

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
                console.log(response)
                res.status(200).json(response.data.message);
            }).catch((error) => {
                console.log(error);
            });
        } catch (error) {
            res.status(500).json(error.response.data.message);
        }
    };

    // Create new document
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

    // Get all the templates
    static async getTemplates(req: Request, res: Response, next: NextFunction) {
        try {
            const getTemplate = await new ZohoSignRepo().getTemplates();
            res.status(200).json(getTemplate);
        } catch (error) {
            res.status(500).json(error.response.data);
        }
    };

    // Get all fields of templates
    static async getFieldsByTemplate(req: Request, res: Response, next: NextFunction) {
        const templateId = get(req?.params, "templateId", '');

        try {
            const getTemplate = await new ZohoSignRepo().getTemplate(templateId as string);
            if (!getTemplate) {
                res.status(403).json('No template found');
            }

            let docFields = '';
            if (getTemplate?.templates?.document_fields[0]?.fields) {
                docFields = getTemplate?.templates?.document_fields[0]?.fields;
            }

            res.status(200).json(docFields);
        } catch (error) {
            console.log(error);
            res.status(500).json(error.response.data);
        }
    };

    // Get all the documents
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

    // Sign documents
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