const { Op } = require("sequelize");
import {
    TListFilters,
    TEditUser,
} from "../../../types";
import { UserModel, ItemStockModel } from "../../../database/schema";
import { USER_TYPE } from '../../../interfaces';
const axios = require('axios');
const apiUrl = 'https://api.petpooja.com'; // Base URL for PetPooja API
const apiKey = process.env.API_KEY; // API key from PetPooja
import IBaseRepo from '../controllers/controller/IPetPoojaController';

// Function to get today's start time and the end time 24 hours later
function getTodayStartTime(): Date {
    const now = new Date();
    return new Date(now.setHours(0, 0, 0, 0));
}

function get24HoursLater(startTime: Date): Date {
    return new Date(startTime.getTime() + 24 * 60 * 60 * 1000 - 1); // Subtract 1 ms to get to 23:59:59
}


export class PetPoojaRepo implements IBaseRepo<TEditUser, TListFilters> {
    constructor() { }

    public async updateStockData(user_id: string, data: any): Promise<[affectedCount: number]> {
        const todayStart = getTodayStartTime();
        const todayEnd = get24HoursLater(todayStart);

        const response = await ItemStockModel.update(data, {
            where: {
                user_id,
                recorded_at: {
                    [Op.between]: [todayStart, todayEnd] // Sequelize operator for range check
                }

            },
        });
        return response;
    }

    public async saveStockData(data: any): Promise<any> {
        const response = await ItemStockModel.create(data);
        return response;
    }

    public async getAllFranchise(): Promise<any> {
        const data = await UserModel.findAll({
            where: {
                type: USER_TYPE.FRANCHISE
            },
        });
        return data;
    }

    public async allEndStock(): Promise<any> {
        const totalStock = await ItemStockModel.sum('endStock'); // Sum of all endStock values
        return totalStock
    }

    public async itemStocks(): Promise<any> {
        const itemStocks = await ItemStockModel.findAll({
            attributes: ['user_id', 'startStock', 'endStock'],
        });
        return itemStocks
    }

    public async aggregate(): Promise<any> {
        const [averageStartStock, averageEndStock] = await Promise.all([
            ItemStockModel.aggregate('startStock', 'avg', { plain: false }), // Average startStock
            ItemStockModel.aggregate('endStock', 'avg', { plain: false }) // Average endStock
        ]);
        return [averageStartStock, averageEndStock]
    }

    public async getStockTrends(): Promise<any> {
        const itemStocks = await ItemStockModel.findAll({
            attributes: ['recorded_at', 'startStock', 'endStock'],
            order: [['recorded_at', 'ASC']], // Order by date
        });
        return itemStocks
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
