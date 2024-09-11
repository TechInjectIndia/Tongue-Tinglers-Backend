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
            const response = await axios.post('https://accounts.zoho.com/oauth/v2/token', null, {
                params: {
                    refresh_token: ZOHO_REFRESH_TOKEN,
                    client_id: ZOHO_CLIENT_ID,
                    client_secret: ZOHO_CLIENT_SECRET,
                    grant_type: 'refresh_token',
                }
            });
            return response.data.access_token;
        } catch (error) {
            console.error('Error getting access token:', error.response ? error.response.data : error.message);
            throw error;
        }
    }
}
