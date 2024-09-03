import { NextFunction, Response } from "express";
import { TQueryFilters, TSettings, TEditSettings } from '../../../../types'

interface ISettingsController<T, F extends TQueryFilters> {
    list(filters: F): Promise<Response<T[]>>;
    get(id: number): Promise<Response<T>>;
    create(payload: TSettings): Promise<Response<T>>;
    update(id: number, payload: TEditSettings): Promise<Response<T>>;
    delete(ids: number[], deletedBy: number): Promise<Response<T>>;
}

export default ISettingsController;
