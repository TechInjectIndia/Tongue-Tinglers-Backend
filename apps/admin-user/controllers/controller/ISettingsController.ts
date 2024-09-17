import { NextFunction, Response } from "express";
import { TQueryFilters, TSettings, TPayloadSettings } from '../../../../types'

interface ISettingsController<T, F extends TQueryFilters> {
    list(filters: F): Promise<Response<T[]>>;
    get(id: number): Promise<T>;
    create(payload: TSettings): Promise<T>;
    update(id: number, payload: TPayloadSettings): Promise<T>;
    delete(ids: number[], deletedBy: number): Promise<T>;
}

export default ISettingsController;
