import { BaseOptions, Options } from "../interface/options";

export interface IOptionsRepo {
    create(product: BaseOptions): Promise<Options | null>;
}