import { NextFunction, Response } from "express";
import { TQueryFilters, TAddUser } from '../../../../types'

interface IUserController<T, F extends TQueryFilters> {
    create(data: TAddUser): Promise<T | null>
}

export default IUserController;