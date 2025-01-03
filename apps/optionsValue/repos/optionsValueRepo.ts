import { BaseOptionsValue, OptionsValue } from "../interface/optionValue";
import { IOptionsValueRepo } from "./IOptionsValueRepo";
import { OptionsValueModel } from "../models/OptionValueTable";
import { OptionsModel } from "apps/options/models/optionTable";

export class OptionsValueRepo implements IOptionsValueRepo {
    async create(option: BaseOptionsValue): Promise<OptionsValue | null> {
        try {
            return (await OptionsValueModel.create({
                option_id: option.option_id,
                name: option.name,
            })).toJSON();
        } catch (error) {
            console.log(error);
            return null;  
        }
    }

    async getAll(): Promise<OptionsValue[] | null> {
        try {
            return (await OptionsValueModel.findAll({
                include:[{
                    model: OptionsModel,
                    as: "options",
                }]
            }
            )).map((option) => option.toJSON());
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}