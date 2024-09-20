const { Op } = require("sequelize");
import {
    TListFilters,
    TEditUser,
} from "../../../types";
import { TokenModel } from "../../../database/schema";
const axios = require('axios');
const { ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN, ZOHO_API_URL, ZOHO_TOKEN_URL } = process.env;

import IBaseRepo from '../controllers/controller/IZohoSignController';

export class ZohoSignRepo implements IBaseRepo<TEditUser, TListFilters> {
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
            console.error('Error getting access token:', error.response ? error.response.data : error.message);
            throw error;
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

    public async getTemplate(templateId: string): Promise<any> {
        return await this.handleTokenError(async () => {
            const accessToken = await new ZohoSignRepo().getAccessTokenFromDb();
            const response = await axios.get(`${ZOHO_API_URL}/templates/${templateId}`, {
                headers: {
                    Authorization: `Zoho-oauthtoken ${accessToken}`,
                },
            });
            return response.data;
        });
    }

    public async sendDocumentUsingTemplate(templateId: String, data: any): Promise<any> {
        return await this.handleTokenError(async () => {
            const accessToken = await new ZohoSignRepo().getAccessTokenFromDb();
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
                response.status(200).json(response.data.message);
            }).catch((error) => {
                console.log(error);
            });
        });
    }

    public async getTemplates(): Promise<any> {
        return await this.handleTokenError(async () => {
            const accessToken = await new ZohoSignRepo().getAccessTokenFromDb();
            const response = await axios.get(`${ZOHO_API_URL}/templates`, {
                headers: {
                    Authorization: `Zoho-oauthtoken ${accessToken}`,
                },
            });
            return response.data;
        });
    }

}
