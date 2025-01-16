import { Pagination } from "apps/common/models/common";
import { ParsedTaxRate, TaxRatePayload } from "../interface/taxRate";

export interface ITaxRateRepo {
    create(payload: TaxRatePayload, user_id: number): Promise<ParsedTaxRate | null>;

    update(id: number, payload: TaxRatePayload): Promise<ParsedTaxRate | null>;

    getById(id: number): Promise<ParsedTaxRate | null>;

    getAll(page: number, limit: number, search: string, filters: object): Promise<Pagination<ParsedTaxRate>>

    delete(id: number): Promise<ParsedTaxRate>
}