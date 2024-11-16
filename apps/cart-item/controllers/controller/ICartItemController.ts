import { TListFilters, TQueryFilters } from "../../../../types";
import { TPayloadCart, TCartList, ICartAttributes } from "../../../../interfaces";

/**
 * Interface for Cart Controller.
 */
interface ICartItemController<T, F extends TQueryFilters> {
    get(id: string): Promise<ICartAttributes | null>;
    list(filters: TListFilters): Promise<TCartList>;
    create(data: TPayloadCart): Promise<ICartAttributes>;
    update(id: string, data: TPayloadCart): Promise<number>;
    delete(ids: string[]): Promise<number>;
    empty(id: string): Promise<void>;
}

export default ICartItemController;
