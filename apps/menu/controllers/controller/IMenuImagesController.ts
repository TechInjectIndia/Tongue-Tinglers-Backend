import { TQueryFilters, TMenuImage, TPayloadMenuImage, TMenuImagesList, TPayloadMenuImage, } from '../../../../types'

interface IMenuImagesController<T, F extends TQueryFilters> {
    get(id: number): Promise<T | null>;
    create(payload: TPayloadMenuImage): Promise<T>;
    list(filters: F): Promise<TMenuImagesList>;
    update(id: number, payload: TPayloadMenuImage): Promise<[affectedCount: number]>;
    delete(ids: number[]): Promise<number>;
}

export default IMenuImagesController;
