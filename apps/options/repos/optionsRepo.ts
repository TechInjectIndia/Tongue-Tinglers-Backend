import { IOptionsRepo } from "./IOptionsRepo";
import {BaseOptions, Options} from "../../../interfaces/options"
import { OptionsModel } from "../../../database/schema/options/optionModel";
export class OptionsRepo implements IOptionsRepo {
    async create(option: BaseOptions): Promise<Options | null> {
        try {
            return (await OptionsModel.create({
                name: option.name,
            })).toJSON();
        } catch (error) {
            console.log(error);
            return null;  
        }
    }
}