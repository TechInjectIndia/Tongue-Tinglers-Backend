import { TQueryFilters, TMenuImage, TEditMenuImage, TMenuImagesList, TAddMenuImage, } from '../../../../types'

interface IMenuImagesController<T, F extends TQueryFilters> {
    get(id: number): Promise<T | null>;
    create(payload: TAddMenuImage): Promise<T>;
    list(filters: F): Promise<TMenuImagesList>;
    update(id: number, payload: TEditMenuImage): Promise<[affectedCount: number]>;
    delete(ids: number[]): Promise<number>;
}

export default IMenuImagesController;
