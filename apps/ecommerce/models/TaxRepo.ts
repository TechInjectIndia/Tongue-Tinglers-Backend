import { Op } from "sequelize";
import { Tax } from "../../../database/schema";
import { TaxAttributes, TaxCreationAttributes } from "../../../interfaces";

import ITaxController from '../controllers/controller/ITaxController';

export class TaxRepo implements ITaxController {
    async createTax(data: TaxCreationAttributes): Promise<Tax> {
        return await Tax.create(data);
    }

    async getTaxById(id: string): Promise<Tax | null> {
        return await Tax.findByPk(id);
    }

    async getAllTaxes(): Promise<Tax[]> {
        return await Tax.findAll();
    }

    async updateTax(id: string, data: Partial<TaxAttributes>): Promise<[number, Tax[]]> {
        return await Tax.update(data, { where: { id }, returning: true });
    }

    async deleteTax(id: string): Promise<number> {
        return await Tax.destroy({ where: { id } });
    }
}

export default new TaxRepo();
