import { BaseOptionsValue, OptionsValue } from "../interface/optionValue";

export interface IOptionsValueRepo {
    create(optionsValue: BaseOptionsValue): Promise<OptionsValue | null>;

    getAll(): Promise<OptionsValue[] | null>;
}