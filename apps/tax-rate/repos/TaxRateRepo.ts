import { Pagination } from "apps/common/models/common";
import { TaxRatePayload, ParsedTaxRate } from "../interface/taxRate";
import { TaxRateModel } from "../models/TaxRateTable";
import { parseTaxRate } from "../parser/taxRateParser";
import { ITaxRateRepo } from "./ITaxRateRepo";
import { Op } from "sequelize";

export default class TaxRateRepo implements ITaxRateRepo {

    async create(payload: TaxRatePayload): Promise<ParsedTaxRate | null> {
        try{
            const taxRateCreated = await TaxRateModel.create(payload);
            return parseTaxRate(taxRateCreated)
        }catch(error){
            console.log(error);
            return null;
        }
    }

    async update(id: number, payload: TaxRatePayload): Promise<ParsedTaxRate | null> {
        try{
            const existingTaxRate = await TaxRateModel.findByPk(id);
            if(!existingTaxRate){
                throw new Error(`Tax Rate with ID ${id} not found`);
            }
            existingTaxRate.set(payload);
            existingTaxRate.save();
            return parseTaxRate(existingTaxRate);
        }catch(error){
            console.log(error)
            return null;
        }
    }

    async getById(id: number): Promise<ParsedTaxRate | null> {
        try{
            const existingTaxRate = await TaxRateModel.findOne({where: {
                id: id
            }});
            if(!existingTaxRate){
                throw new Error(`Tax Rate with ID ${id} not found`);
            }
            return parseTaxRate(existingTaxRate)
        }catch(error){
            console.log(error)
            return null;
        }
    }

    async getAll(page: number, limit: number, search: string, filters: object): Promise<Pagination<ParsedTaxRate>> {
        try{
            const query: any = {};
            const offset = (page - 1) * limit;
            if(search){
                query[Op.or] = [
                    { title: { [Op.iLike]: `%${search}%` } },
                    { value: { [Op.iLike]: `%${search}%` } },
                ];
            }
            if(filters){
                Object.assign(query, filters);
            }
            const { rows: taxRateData, count: total } = await TaxRateModel.findAndCountAll({
                where: query,
                offset,
                limit,
                order: [["createdAt", "DESC"]],
                include:[]
            }).then((data)=> {
                return {
                    rows: data.rows.map((taxRate) => parseTaxRate(taxRate)),
                    count: data.count,
                };
            })
            const totalPages = Math.ceil(total / limit);
            return {data: taxRateData, total, totalPages}
        }catch(error){
            console.log(error)
            return null;
        }
    }

    async delete(id: number): Promise<ParsedTaxRate> {
        try{
            const existingTaxRate = await TaxRateModel.findByPk(id);
            if(!existingTaxRate){
                throw new Error(`Tax Rate with ID ${id} not found`);
            }
            existingTaxRate.destroy();
            return parseTaxRate(existingTaxRate);
        }catch(error){
            console.log(error)
            return null;
        }
    }

}