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
import { ContractRepo } from "../../contracts/models/ContractModel";

export class ZohoSignRepo implements IBaseRepo<TemplateType> {
    constructor() { }

    public async handleZohoSignCaptured(contractId, signedDocs) {
        // const signedDocs = contractDetails.signedDocs.map((doc) => {
        //     if (doc.docId === requestId) {
        //         return {
        //             ...doc,
        //             status: status
        //         };
        //     }
        //     return doc;
        // });

        const res = await new ContractRepo().updateContractDoc(contractId, { signedDocs });

        console.log("Updated signedDocs:", res);
    }


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
            throw error;
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
            throw error;
        }
    }

    private async handleTokenError(method: () => Promise<any>): Promise<any> {
        try {
            return await method();
        } catch (error) {
            if (this.isTokenError(error)) {
                await TokenModel.update({ isActive: false, accessToken: '' }, {
                    where: {
                        tokenType: 'zoho',
                    },
                });
                console.warn('Token error detected, refreshing token...');
                await this.getAccessTokenFromZoho();
                return await method();
            } else {
                console.log(error)
                throw error;
            }
        }
    }

    private isTokenError(error: any): boolean {
        return error.response && error.response.status === 401;
    }

    public async sendDocumentUsingTemplate(templateId: string, data: any): Promise<any> {
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
                console.log(error)
                throw error;
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
                console.log(error)
                throw error;
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
                console.log(error)
                throw error;
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
                console.log(error)
                throw error;
            }
        });
    }
}
