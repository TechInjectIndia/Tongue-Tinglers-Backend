import { NextFunction, Response } from "express";
import { TPayloadFranchiseModel, FranchiseModels, FranchiseModelsList } from '../../../../interfaces';
import { TQueryFilters } from '../../../../types';

/**
 * Interface for FranchiseModels Controller.
 */
interface IFranchiseModelsController<T, F extends TQueryFilters> {
    get(id: number, user_id: number): Promise<T | null>;
    create(payload: TPayloadFranchiseModel): Promise<T>;
    deleteByFranchiseModelId(franchiseModelId: string): Promise<number>
}

export default IFranchiseModelsController;
