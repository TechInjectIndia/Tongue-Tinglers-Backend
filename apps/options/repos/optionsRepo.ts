import { Options } from "apps/order/interface/Options";
import { BaseOptions } from "../interface/options";
import { IOptionsRepo } from "./IOptionsRepo";
import { OptionsModel } from "../models/optionTable";

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