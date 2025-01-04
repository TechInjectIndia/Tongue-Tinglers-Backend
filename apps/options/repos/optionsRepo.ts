
import {BaseOptions, Options} from "apps/options/interface/options";
import { IOptionsRepo } from "apps/options/repos/IOptionsRepo";
import { OptionsModel } from "apps/options/models/optionTable";

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
