import { NextFunction, Response } from "express";
import { TQueryFilters, TEditUserProfile } from '../../../../types'

interface IProfileController<T> {
    get(id: number): Promise<T>;
    update(id: number, payload: TEditUserProfile): Promise<[affectedCount: number]>;
}

export default IProfileController;
