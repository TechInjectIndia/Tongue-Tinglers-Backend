import { APIResponse, PaginatedBaseResponse } from "apps/common/models/Base";
import { DebitNoteTable } from "../database/DebitNoteTable";
import { ICreateDebitNote, IDebitNoteOverviewResponse, IDebitNoteResponse, IMarkDebitNotePaid, } from "../models/IDebitNote";

export interface IDebitNoteRepo {
    create(payload: ICreateDebitNote): Promise<APIResponse<DebitNoteTable | null>>;

    getAll(page: number, pageSize: number): Promise<APIResponse<PaginatedBaseResponse<IDebitNoteOverviewResponse> | null>>;

    getByPurchasInvoiceId(purchaseInvoiceId: number): Promise<APIResponse<IDebitNoteResponse[] | null>>;

    markPaid(payload: IMarkDebitNotePaid): Promise<APIResponse<null>>;

}