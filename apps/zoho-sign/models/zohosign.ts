const { Op } = require("sequelize");
import {
    TListFilters,
    TEditUser,
} from "../../../types";
const axios = require('axios');
const { ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN, ZOHO_API_BASE_URL } = process.env;

import IBaseRepo from '../controllers/controller/IZohoSignController';

export class ZohoSignRepo implements IBaseRepo<TEditUser, TListFilters> {
    constructor() { }

    public async getAccessTokenZoho(): Promise<any> {
        try {
            const redirectUri = 'http://localhost:3001/api/zoho-sign/oauth/callback'; // Local redirect URI
            const scope = 'ZohoSign.documents.CREATE ZohoSign.documents.READ'; // Adjust scopes as needed
            const authUrl = `https://accounts.zoho.com/oauth/v2/auth?scope=${scope}&client_id=${ZOHO_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}`;
            console.log(authUrl)

            const response = await axios.post('https://accounts.zoho.in/oauth/v2/token', null, {
                params: {
                    client_id: ZOHO_CLIENT_ID,
                    client_secret: ZOHO_CLIENT_SECRET,
                    grant_type: 'authorization_code',
                    code: '1000.fd50bab8e38052d6a35b7e8fb13c0615.7aa7c9978d5e4ffca3b7c0c2e9372656',
                }
            });
            console.log('hi', response.data);
            return response.data.access_token;
        } catch (error) {
            console.error('Error getting access token:', error.response ? error.response.data : error.message);
            throw error;
        }
    }
}
