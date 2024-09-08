import { TQueryFilters, TOrderItem } from '../../../../types'

interface IOrderItemsController<T, F extends TQueryFilters> {
    checkRepeatedOrder(userId: number, productId: number): Promise<T>;
    create(payload: TOrderItem): Promise<T>;
}

export default IOrderItemsController;
