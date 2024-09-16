import { NextFunction, Response } from "express";
import { TQueryFilters, TAddUser, TEditUser, TEditUserProfile, TUsersList, TUserWithPermission } from '../../../../types'

interface IUserController<T, F extends TQueryFilters> {
    list(filters: F): Promise<TUsersList>;
    get(id: string): Promise<TUserWithPermission>;
    create(payload: TAddUser): Promise<T>;
    update(id: string, payload: TEditUser): Promise<[affectedCount: number]>;
    delete(ids: string[], deletedBy: number): Promise<number>;
    deletedList(filters: F): Promise<TUsersList>;
    restore(ids: string[]): Promise<void>;
    deletePermanant(ids: string[]): Promise<number>;
    updateProfile(id: string, payload: TEditUserProfile): Promise<[affectedCount: number]>;
}

export default IUserController;
