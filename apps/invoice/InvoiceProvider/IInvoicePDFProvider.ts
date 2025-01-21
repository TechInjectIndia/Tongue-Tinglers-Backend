import { DTO } from "apps/common/models/DTO";
import type { ParsedOrder } from "apps/order/interface/Order";

interface IInvoicePDFProvider {
    generate(order: ParsedOrder): Promise<DTO<ArrayBuffer>>

    getUI(order: ParsedOrder): DTO<string>;

    getTablesUI(order: ParsedOrder): string;
}

export { type IInvoicePDFProvider };