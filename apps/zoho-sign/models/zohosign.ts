const { Op } = require("sequelize");
import {
    TListFilters,
    TEditUser,
} from "../../../types";
const axios = require('axios');
const { ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN, ZOHO_API_URL } = process.env;

import IBaseRepo from '../controllers/controller/IZohoSignController';

export class ZohoSignRepo implements IBaseRepo<TEditUser, TListFilters> {
    constructor() { }

    public async getAccessTokenZoho(): Promise<any> {
        try {
            const redirectUri = 'https%3A%2F%2Fsign.zoho.com';
            const response = await axios.post('https://accounts.zoho.in/oauth/v2/token', null, {
                params: {
                    client_id: ZOHO_CLIENT_ID,
                    client_secret: ZOHO_CLIENT_SECRET,
                    refresh_token: ZOHO_REFRESH_TOKEN,
                    redirectUri: redirectUri,
                    grant_type: 'refresh_token',
                }
            });
            return response.data.access_token;
        } catch (error) {
            console.error('Error getting access token:', error.response ? error.response.data : error.message);
            throw error;
        }
    }

    public async getTemplate(templateId: string): Promise<any> {
        const accessToken = await new ZohoSignRepo().getAccessTokenZoho();
        try {
            const response = await axios.get(`${ZOHO_API_URL}/templates/${templateId}`, {
                headers: {
                    Authorization: `Zoho-oauthtoken ${accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async getTemplates(): Promise<any> {
        const accessToken = await new ZohoSignRepo().getAccessTokenZoho();
        try {
            const response = await axios.get(`${ZOHO_API_URL}/templates`, {
                headers: {
                    Authorization: `Zoho-oauthtoken ${accessToken}`,
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

}