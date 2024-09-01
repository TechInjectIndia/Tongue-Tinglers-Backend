import { NextFunction, Response } from "express";
import { TQueryFilters, TAddUser, TEditUser, TEditUserProfile } from '../../../../types'

interface IController<T, F extends TQueryFilters> {
    list(filters: F): Promise<Response<T[]>>;
    get(id: number): Promise<Response<T>>;
    create(payload: TAddUser): Promise<Response<T>>;
    update(id: number, payload: TEditUser): Promise<Response<T>>;
    delete(ids: number[]): Promise<Response<T>>;
    deletedList(filters: F): Promise<Response<T[]>>;
    restore(ids: number[]): Promise<Response<T>>;
    deletePermanant(ids: number[]): Promise<Response<T>>;
    updateProfile(id: number, payload: TEditUserProfile): Promise<Response<T>>;
}

export default IController;
