import { NextFunction, Request, Response } from "express";
const axios = require('axios');
import { ZohoSignRepo } from '../models/zohosign';
import { ContractRepo } from '../../contracts/models/ContractModel';
import { sendResponse } from "../../../libraries";
import { get, isEmpty } from "lodash";
import FormData from 'form-data';
import fs from 'fs';
import crypto from 'crypto';

const { ZOHO_WEBHOOK_SECRET } = process.env;

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


        // const sendDocument = await new ZohoSignRepo().sendDocumentUsingTemplate(templateId, data);
        // if (sendDocument) {
        //     const newDoc = {
        //         id: sendDocument.document_id,
        //         name: sendDocument.document_name,
        //         url: sendDocument.document_url,
        //         status: sendDocument.document_status,
        //         additionalInfo: '',
        //     };
        //     await new ContractRepo().updateContractDoc(contractId, newDoc);

        //     console.log(sendDocument)
        // }

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

        res.json({ status: 'success' });
    };

    // Send document to franchise using template
    static async sendDocumentUsingTemplate(req: Request, res: Response, next: NextFunction) {
        try {
            const templateId = get(req.body, "templateId", '');
            const contractId = get(req.body, "contractId", '');
            const recipientName = get(req.body, "recipientName", '');
            const notes = get(req.body, "notes", '');
            const recipientEmail = get(req.body, "recipientEmail", '');
            let prefilledValues = get(req.body, "prefilledValues", '');

            const contractDetails = await new ContractRepo().get(contractId as string)
            if (!contractDetails) {
                res.status(403).json('No contract found');
            }

            const getTemplate = await new ZohoSignRepo().getTemplateFields(templateId as string);
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
                    "actions": [],
                    "notes": notes
                }
            };

            if (getTemplate?.docs) {
                const docFields = getTemplate.docs;
                prefilledValues = JSON.parse(prefilledValues);

                docFields.forEach(doc => {
                    const fields = doc.fields || [];

                    fields.forEach(field => {
                        const fieldLabel = field.field_label;
                        const fieldValue = prefilledValues[fieldLabel] || '';

                        if (field.field_category === 'textfield') {
                            jsonData.templates.field_data.field_text_data[fieldLabel] = fieldValue;
                        }
                    });
                });
            }

            if (getTemplate.actions.length > 0) {
                getTemplate.actions.forEach(action => {
                    jsonData.templates.actions.push({
                        recipient_name: recipientName,
                        recipient_email: recipientEmail,
                        action_id: action.action_id,
                        action_type: action.action_type,
                        signing_order: 1,
                        verify_recipient: "false",
                        private_notes: ""
                    });
                });
            }

            let data = new FormData();
            data.append('data', JSON.stringify(jsonData));

            const sendDocument = await new ZohoSignRepo().sendDocumentUsingTemplate(templateId, data);
            if (sendDocument) {
                const newDoc = {
                    id: sendDocument?.data?.requests.request_id,
                    name: sendDocument?.data?.requests.request_name,
                    url: '',
                    status: sendDocument?.data?.requests.request_status,
                    additionalInfo: sendDocument?.data?.requests.notes,
                };
                await new ContractRepo().updateContractDoc(contractId, newDoc);

                res.status(200).json(sendDocument.message);
            }
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    };

    // Get all the templates
    static async getTemplates(req: Request, res: Response, next: NextFunction) {
        try {
            const getTemplate = await new ZohoSignRepo().getTemplates();
            if (getTemplate) {
                return res.status(200).json(getTemplate);
            }
            return res.status(403).json('No templates found');
        } catch (error) {
            return res.status(500).json(error.response);
        }
    };

    // Get all fields of templates
    static async getFieldsByTemplate(req: Request, res: Response, next: NextFunction) {
        const templateId = get(req?.params, "templateId", '');
        try {
            const getTemplateFields = await new ZohoSignRepo().getTemplateFields(templateId as string);
            if (!getTemplateFields) {
                res.status(403).json('No template found');
            }
            res.status(200).json(getTemplateFields);
        } catch (error) {
            console.log(error);
            res.status(500).json(error.response.data);
        }
    };
}