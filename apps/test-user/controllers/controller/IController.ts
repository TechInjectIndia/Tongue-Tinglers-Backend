import { NextFunction, Response } from "express";
import { TQueryFilters, TAddUser } from '../../../../types'

interface IController<T, F extends TQueryFilters> {
    create(payload: TAddUser): Promise<Response<T>>;
}

export default IController;
