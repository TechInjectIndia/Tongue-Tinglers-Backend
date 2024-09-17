import { NextFunction, Response } from "express";
import { TQueryFilters, TPermissionPayload, TPermissionsList, TUser } from '../../../../types'

interface IPermissionsController<T, F extends TQueryFilters> {
    getPermissionAssigneeByPermissionId(ids: number[]): Promise<TUser[]>;
    getPermissionByName(name: string): Promise<T>;
    checkPermissionExist(name: string, excludeId: number): Promise<T>;
    list(filters: F): Promise<TPermissionsList>;
    get(id: number): Promise<T>;
    create(payload: TPermissionPayload): Promise<T>;
    update(id: number, payload: TPermissionPayload): Promise<[affectedCount: number]>;
}

export default IPermissionsController;
