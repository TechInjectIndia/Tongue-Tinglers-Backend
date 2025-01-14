import { APIResponse, PaginatedBaseResponse } from "apps/common/models/Base";
import { IPurchaseInvoiceRequest, IPurchaseInvoiceResponse } from "../models/IPurchaseInvoice";

export interface IPurchaseInvoiceRepo {

    create(purchaseInvoice: IPurchaseInvoiceRequest): Promise<APIResponse<null>>;

    getAll(page: number, pageSize: number): Promise<APIResponse<PaginatedBaseResponse<IPurchaseInvoiceResponse> | null>>;

    // getById(id: number): Promise<APIResponse<IPurchaseInvoiceResponse | null>>;

}                       