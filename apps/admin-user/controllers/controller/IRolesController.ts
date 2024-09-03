import { NextFunction, Response } from "express";
import { TQueryFilters, TAddRole, TEditRole } from '../../../../types'

interface IRolesController<T, F extends TQueryFilters> {
    getRoleAssigneeByRoleId(ids: number[]): Promise<Response<T>>;
    getRoleByName(name: string): Promise<Response<T>>;
    list(filters: F): Promise<Response<T[]>>;
    get(id: number): Promise<Response<T>>;
    create(payload: TAddRole): Promise<Response<T>>;
    update(id: number, payload: TEditRole): Promise<Response<T>>;
    deleteRole(ids: number[]): Promise<Response<T>>;
}

export default IRolesController;
