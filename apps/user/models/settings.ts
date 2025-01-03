import { TPayloadSettings, TSettings } from "types";
import { SettingsModel } from "./SettingTable";

const { Op } = require("sequelize");


export class SettingsRepo {
    constructor() { }

    public async editSettings(
        id: number,
        data: TPayloadSettings
    ): Promise<[affectedCount: number]> {
        return await SettingsModel.update(data, {
            where: {
                id,
            },
        });
    }

    public async get(id: number): Promise<TSettings | any> {
        const data = await SettingsModel.findOne({
            where: {
                id,
            },
        });
        return data;
    }

}
