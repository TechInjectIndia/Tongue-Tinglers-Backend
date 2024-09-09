import { NextFunction, Response } from "express";
import { TQueryFilters, TEditUser, TUserWithPermission } from '../../../../types'

interface IPetPoojaController<T, F extends TQueryFilters> {
    getAllFranchise(): Promise<TEditUser>;
    savePetPoojaOrder(franchiseId: number): Promise<TUserWithPermission>;
}

export default IPetPoojaController;
