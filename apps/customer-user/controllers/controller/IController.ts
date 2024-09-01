import { NextFunction, Response } from "express";

import {
    TProfile,
    TEditProfile
} from "../../../../types/";

interface IController<T, F extends TQueryFilters> {
    list(filters: F): Promise<Response<T[]>>;
    get(id: number): Promise<Response<T>>;
    create(payload: TAddProfile): Promise<Response<T>>;
    update(id: number, payload: TEditProfile): Promise<Response<T>>;
    delete(ids: number[]): Promise<Response<T>>;
    deletedList(filters: F): Promise<Response<T[]>>;
    restore(ids: number[]): Promise<Response<T>>;
    deletePermanant(ids: number[]): Promise<Response<T>>;
    updateProfile(id: number, payload: TEditProfileProfile): Promise<Response<T>>;
}

export default IController;
