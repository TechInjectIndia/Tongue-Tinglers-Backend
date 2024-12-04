import { BaseOptionsValue, OptionsValue } from "../../../interfaces/optionsValue";

export interface IOptionsValueRepo {
    create(optionsValue: BaseOptionsValue): Promise<OptionsValue | null>;
}