import { ParsedOptions, parseOptions } from "../../options/interface/options";

interface BaseOptionsValue {
    option_id: number;
    name: string;
    isStockable:boolean
}

interface OptionsValue extends BaseOptionsValue {
    id: number;
}

interface ParsedOptionsValue {
    id: number;
    name: string;
    options: ParsedOptions;
    isStockable: boolean
}

export const parseOptionsValues = (data: ParsedOptionsValue):ParsedOptionsValue => {
    return {
        id: data.id,
        name: data.name,
        options: parseOptions(data.options),
        isStockable: data.isStockable
    };
};

export { BaseOptionsValue, OptionsValue, ParsedOptionsValue };
