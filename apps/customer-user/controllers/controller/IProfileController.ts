import { NextFunction, Response } from "express";
import { TQueryFilters, TEditUserProfile } from '../../../../types'

interface IProfileController<T> {
    get(id: number): Promise<Response<T>>;
    update(id: number, payload: TEditUserProfile): Promise<Response<T>>;
}

export default IProfileController;
