import { TQueryFilters, TAddEmail, TEmailsList, TEditEmail } from '../../../../types'

interface IEmailController<T, F extends TQueryFilters> {
    get(id: number): Promise<T | null>;
    create(payload: TAddEmail): Promise<T>;
    list(filters: F): Promise<TEmailsList>;
    update(id: number, payload: TEditEmail): Promise<[affectedCount: number]>;
}

export default IEmailController;
