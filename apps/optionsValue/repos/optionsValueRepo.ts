import { IOptionsValueRepo } from "./IOptionsValueRepo";
import {BaseOptionsValue, OptionsValue} from "../../../interfaces/optionsValue"
import { OptionsValueModel } from "../../../database/schema/optionsValue/optionsValueModel";
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
}