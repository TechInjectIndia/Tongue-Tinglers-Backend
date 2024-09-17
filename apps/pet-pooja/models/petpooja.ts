const { Op } = require("sequelize");
import {
    TListFilters,
    TEditUser,
} from "../../../types";
import { UserModel } from "../../../database/schema";
import { USER_TYPE } from '../../../interfaces';
const axios = require('axios');
const apiUrl = 'https://api.petpooja.com'; // Base URL for PetPooja API
const apiKey = process.env.API_KEY; // API key from PetPooja

import IBaseRepo from '../controllers/controller/IPetPoojaController';

export class PetPoojaRepo implements IBaseRepo<TEditUser, TListFilters> {
    constructor() { }

    public async getAllFranchise(): Promise<any> {
        const data = await UserModel.findAll({
            where: {
                type: USER_TYPE.FRANCHISE
            },
        });
        return data;
    }

    public async getInventory(franchiseId: string): Promise<any> {
        const response = await axios.get(`${apiUrl}/inventory`, {
            headers: {
                'Authorization': `Bearer ${apiKey}`
            }
        });

        // Save inventory to database, date wise, ( franchiseId )
    }

    public async savePetPoojaOrder(franchiseId: string): Promise<any> {

        // Save new Order        
    }
}
