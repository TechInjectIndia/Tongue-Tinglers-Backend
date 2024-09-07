import { TQueryFilters, TOrderItem } from '../../../../types'

interface IOrderItemsController<T, F extends TQueryFilters> {
    create(payload: TOrderItem): Promise<T>;
}

export default IOrderItemsController;
