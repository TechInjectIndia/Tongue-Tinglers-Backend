import { NextFunction, Response } from "express";
import { TPayloadFranchiseModel, SeoImage } from '../../../../interfaces';
import { TQueryFilters } from '../../../../types';

/**
 * Interface for FranchiseModels Controller.
 */
interface IFranchiseModelsController<T, F extends TQueryFilters> {
    get(id: number, user_id: number): Promise<T | null>;
    create(payload: TPayloadFranchiseModel): Promise<T>;
    deleteByFranchiseModelId(franchiseModelId: string): Promise<number>
    update(id: string, data: SeoImage): Promise<[number, SeoImage[]]>
}

export default IFranchiseModelsController;
