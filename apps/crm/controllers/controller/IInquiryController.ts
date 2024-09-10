import { TQueryFilters, TAddInquiry, TInquirysList, TEditInquiry } from '../../../../types'

interface IInquiryController<T, F extends TQueryFilters> {
    get(id: number): Promise<T | null>;
    create(payload: TAddInquiry): Promise<T>;
    list(filters: F): Promise<TInquirysList>;
    update(id: number, payload: TEditInquiry): Promise<[affectedCount: number]>;
}

export default IInquiryController;
