import { ParsedOptions, parseOptions } from "../../options/interface/options";

interface BaseOptionsValue {
    option_id: number;
    name: string;
}

interface OptionsValue extends BaseOptionsValue {
    id: number;
}

interface ParsedOptionsValue {
    id: number;
    name: string;
    options: ParsedOptions;
}

export const parseOptionsValues = (data: ParsedOptionsValue):ParsedOptionsValue => {
    return {
        id: data.id,
        name: data.name,
        options: parseOptions(data.options),
    };
};

export { BaseOptionsValue, OptionsValue, ParsedOptionsValue };
