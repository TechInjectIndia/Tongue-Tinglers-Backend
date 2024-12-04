import { BaseOptions, Options } from "../../../interfaces/options";

export interface IOptionsRepo {
    create(product: BaseOptions): Promise<Options | null>;
}