import { TListFilters, TQueryFilters } from "../../../../types";
import { TPayloadCart, TCartList, ICartAttributes } from "../../../../interfaces";

/**
 * Interface for Cart Controller.
 */
interface ICartItemController<T, F extends TQueryFilters> {
    get(id: number): Promise<ICartAttributes | null>;
    list(filters: TListFilters): Promise<TCartList>;
    create(data: TPayloadCart): Promise<ICartAttributes>;
    update(id: number, data: TPayloadCart): Promise<number>;
    delete(ids: number[]): Promise<number>;
    empty(id: number): Promise<void>;
}

export default ICartItemController;
