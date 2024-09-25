const { Op } = require("sequelize");
import {
    TemplateType,
    DocumentData,
    SendResponse,
    TemplateList,
    FieldType,
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
            return error;
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
            console.error('Error getting access token:', error.response ? error.response.data : error.message);
            return error;
        }
    }

    private async handleTokenError(method: () => Promise<any>): Promise<any> {
        try {
            return await method();
        } catch (error) {
            if (this.isTokenError(error)) {
                console.warn('Token error detected, refreshing token...');
                await this.getAccessTokenFromZoho();
                return await method();
            }
        }
    }

    private isTokenError(error: any): boolean {
        return error.response && error.response.status === 401;
    }

    public async sendDocumentUsingTemplate(templateId, data): Promise<SendResponse> {
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
                return response;
            } catch (error) {
                const errorMessage = error.response ? error.response.data : error.message;
                console.error('Error sending document:', errorMessage);
                return new Error(`Failed to send document: ${errorMessage}`); // return a clear error
            }
        });
    }

    public async getTemplates(): Promise<TemplateList> {
        return await this.handleTokenError(async () => {
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
        });
    }

    public async getTemplateFields(templateId: string): Promise<FieldType> {
        return await this.handleTokenError(async () => {
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
        });
    }
}
