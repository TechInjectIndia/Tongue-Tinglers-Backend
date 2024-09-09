import { TQueryFilters, TAddSubscriber, TSubscribersList, TEditSubscriber } from '../../../../types'

interface ISubscriberController<T, F extends TQueryFilters> {
    get(id: number): Promise<T | null>;
    create(payload: TAddSubscriber): Promise<T>;
    list(filters: F): Promise<TSubscribersList>;
    update(id: number, payload: TEditSubscriber): Promise<[affectedCount: number]>;
}

export default ISubscriberController;
