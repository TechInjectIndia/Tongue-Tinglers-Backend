import { NextFunction, Response } from "express";
import { TQueryFilters, TAddUser, TEditUser, TEditUserProfile, TUsersList, TUserWithPermission } from '../../../../types'

interface IController<T, F extends TQueryFilters> {
    list(filters: F): Promise<TUsersList>;
    get(id: number): Promise<TUserWithPermission>;
    create(payload: TAddUser): Promise<T>;
    update(id: number, payload: TEditUser): Promise<[affectedCount: number]>;
    delete(ids: number[], deletedBy: number): Promise<number>;
    deletedList(filters: F): Promise<TUsersList>;
    restore(ids: number[]): Promise<void>;
    deletePermanant(ids: number[]): Promise<number>;
    updateProfile(id: number, payload: TEditUserProfile): Promise<[affectedCount: number]>;
}

export default IController;
