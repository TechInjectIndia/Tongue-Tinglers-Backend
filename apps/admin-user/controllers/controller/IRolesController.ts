import { NextFunction, Response } from "express";
import { TQueryFilters, TAddRole, TEditRole, TUser, TRolesList } from '../../../../types'

interface IRolesController<T, F extends TQueryFilters> {
    getRoleAssigneeByRoleId(ids: number[]): Promise<TUser[]>;
    getRoleByName(name: string): Promise<T>;
    list(filters: F): Promise<TRolesList>;
    get(id: number): Promise<T>;
    create(payload: TAddRole): Promise<T>;
    update(id: number, payload: TEditRole): Promise<[affectedCount: number]>;
    deleteRole(ids: number[]): Promise<number>;
}

export default IRolesController;
