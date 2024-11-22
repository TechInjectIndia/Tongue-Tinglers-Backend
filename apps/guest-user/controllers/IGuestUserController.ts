import { TQueryFilters, TUserWithPermission } from "../../../types";

interface IGuestUserController<T, F extends TQueryFilters> {
    get(id: number): Promise<TUserWithPermission>;

}

export default IGuestUserController;
