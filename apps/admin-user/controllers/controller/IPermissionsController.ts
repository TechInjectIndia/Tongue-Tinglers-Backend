import { NextFunction, Response } from "express";
import { TQueryFilters, TAddPermission, TEditPermission } from '../../../../types'

interface IPermissionsController<T, F extends TQueryFilters> {
    getPermissionAssigneeByPermissionId(ids: number[]): Promise<Response<T>>;
    getPermissionByName(name: string): Promise<Response<T>>;
    checkPermissionExist(name: string, excludeId: number): Promise<Response<T>>;
    list(filters: F): Promise<Response<T[]>>;
    get(id: number): Promise<Response<T>>;
    create(payload: TAddPermission): Promise<Response<T>>;
    update(id: number, payload: TEditPermission): Promise<Response<T>>;
}

export default IPermissionsController;
