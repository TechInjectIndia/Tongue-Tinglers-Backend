import { NextFunction, Response } from "express";
import { TQueryFilters, TAddUser } from '../../../../types'

interface IController<T, F extends TQueryFilters> {
    create(payload: TAddUser): Promise<T>;
}

export default IController;
