const { Op } = require("sequelize");
import {
    TemplateType,
    jsonData,
    SendResponse,
    TemplateList,
    FieldType,
    DocumentDetails
} from "../../../types";
import { TokenModel } from "../../../database/schema";
const axios = require('axios');
const { ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN, ZOHO_API_URL, ZOHO_TOKEN_URL } = process.env;
import IBaseRepo from '../controllers/controller/IZohoSignController';

export class ZohoSignRepo implements IBaseRepo<TemplateType> {
    constructor() { }

    public async getAccessTokenFromDb(): Promise<string> {
        try {
            const tokenRecord = await TokenModel.findOne({
                where: {
                    isActive: true,
                    tokenType: 'zoho'
                },
            });

            if (tokenRecord) {
                return tokenRecord.accessToken;
            } else {
                return await this.getAccessTokenFromZoho();
            }
        } catch (error) {
            console.error('Error retrieving access token from DB:', error.message);
            throw new Error(`Error retrieving access token from DB: ${error.message}`);
        }
    }

    public async getAccessTokenFromZoho(): Promise<any> {
        try {
            const redirectUri = 'https%3A%2F%2Fsign.zoho.com';
            const response = await axios.post(ZOHO_TOKEN_URL, null, {
                params: {
                    client_id: ZOHO_CLIENT_ID,
                    client_secret: ZOHO_CLIENT_SECRET,
                    refresh_token: ZOHO_REFRESH_TOKEN,
                    redirectUri: redirectUri,
                    grant_type: 'refresh_token',
                }
            });

            await TokenModel.upsertToken(response.data.access_token, true, 'zoho');
            return response.data.access_token;
        } catch (error) {
            const errorMessage = error.response ? error.response.data : error.message;
            console.error('Error getting access token from Zoho:', errorMessage);
            throw new Error(`Error getting access token from Zoho: ${errorMessage}`);
        }
    }

    private async handleTokenError(method: () => Promise<any>): Promise<any> {
        try {
            return await method();
        } catch (error) {
            const response = await TokenModel.update({ isActive: true }, {
                where: {
                    tokenType: 'zoho',
                },
            });

            if (response) {
                console.warn('Token error detected, refreshing token...');
                await this.getAccessTokenFromZoho();
                return await method();
            } else {
                const errorMessage = error.response ? error.response.data : error.message;
                console.error('Error during API call:', errorMessage);
                throw new Error(`Error during API call: ${errorMessage}`);
            }
        }
    }

    private isTokenError(error: any): boolean {
        return error.response && error.response.status === 401;
    }

    public async sendDocumentUsingTemplate(templateId: string, data: any): Promise<SendResponse> {
        return await this.handleTokenError(async () => {
            try {
                const accessToken = await this.getAccessTokenFromDb();
                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: `${ZOHO_API_URL}/templates/${templateId}/createdocument`,
                    headers: {
                        'Authorization': `Zoho-oauthtoken ${accessToken}`,
                    },
                    data: data
                };

                const response = await axios.request(config);
                return response.data;
            } catch (error) {
                const errorMessage = error.response ? error.response.data : error.message;
                console.error('Error sending document:', errorMessage);
                throw new Error(`Failed to send document: ${errorMessage}`);
            }
        });
    }

    public async getTemplates(): Promise<TemplateList> {
        return await this.handleTokenError(async () => {
            try {
                const accessToken = await this.getAccessTokenFromDb();
                const response = await axios.get(`${ZOHO_API_URL}/templates`, {
                    headers: {
                        Authorization: `Zoho-oauthtoken ${accessToken}`,
                    },
                });
                return response.data.templates.map((template: any) => ({
                    templateId: template.template_id,
                    templateTitle: template.template_name
                })) as TemplateList;
            } catch (error) {
                const errorMessage = error.response ? error.response.data : error.message;
                console.error('Error retrieving templates:', errorMessage);
                throw new Error(`Failed to retrieve templates: ${errorMessage}`);
            }
        });
    }

    public async getDocument(documentId: string): Promise<DocumentDetails> {
        return await this.handleTokenError(async () => {
            try {
                const accessToken = await this.getAccessTokenFromDb();
                const response = await axios.get(`${ZOHO_API_URL}/requests/${documentId}`, {
                    headers: {
                        Authorization: `Zoho-oauthtoken ${accessToken}`,
                    },
                });
                return response.data;

            } catch (error) {
                const errorMessage = error.response ? error.response.data : error.message;
                console.error('Error retrieving document:', errorMessage);
                throw new Error(`Failed to retrieve document: ${errorMessage}`);
            }
        });
    }

    public async getTemplateFields(templateId: string): Promise<FieldType> {
        return await this.handleTokenError(async () => {
            try {
                const accessToken = await new ZohoSignRepo().getAccessTokenFromDb();
                const response = await axios.get(`${ZOHO_API_URL}/templates/${templateId}`, {
                    headers: {
                        Authorization: `Zoho-oauthtoken ${accessToken}`,
                    },
                });

                return {
                    docs: response.data.templates.document_fields.map((docs: any) =>
                    ({
                        document_id: docs.document_id,
                        fields: docs.fields.map((field: any) => ({
                            field_label: field.field_label,
                            is_mandatory: field.is_mandatory,
                            field_category: field.field_category,
                            default_value: field.default_value,
                        })),
                    })) || [],
                    actions: response.data.templates.actions.map((action: any) => ({
                        action_id: action.action_id,
                        action_type: action.action_type,
                    })) || [],
                } as FieldType;
            } catch (error) {
                const errorMessage = error.response ? error.response.data : error.message;
                console.error('Error retrieving template fields:', errorMessage);
                throw new Error(`Failed to retrieve template fields: ${errorMessage}`);
            }
        });
    }
}
