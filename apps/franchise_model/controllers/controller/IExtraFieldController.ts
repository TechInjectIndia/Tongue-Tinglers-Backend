import { TPayloadFranchiseModel } from "../../interface/franchiseModel";
import { TQueryFilters } from "../../../../types";

/**
 * Interface for FranchiseModels Controller.
 */
interface IFranchiseModelsController<T, F extends TQueryFilters> {
    get(id: number, user_id: number): Promise<T | null>;

    create(payload: TPayloadFranchiseModel): Promise<T>;

    deleteByFranchiseModelId(franchiseModelId: number): Promise<number>;
}

export default IFranchiseModelsController;
