import { NextFunction, Response } from "express";
import { TQueryFilters, TAddUser, TUserWithPermission } from '../../../../types'

interface ICustomerRegisterController<T, F extends TQueryFilters> {
    get(email: string): Promise<T | null>;
    create(payload: TAddUser): Promise<T>;
}

export default ICustomerRegisterController;
