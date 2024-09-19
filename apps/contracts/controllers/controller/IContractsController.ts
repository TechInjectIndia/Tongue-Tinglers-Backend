import { TQueryFilters } from '../../../../types';

interface IContractsController<T, F extends TQueryFilters> {
    create(data: T): Promise<T>;
    get(id: string): Promise<T | null>;
    list(filters: F): Promise<{ total: number; data: T[] }>;
    update(id: string, data: Partial<T>): Promise<[affectedCount: number]>;
    delete(ids: string[]): Promise<number>;
}

export default IContractsController;
