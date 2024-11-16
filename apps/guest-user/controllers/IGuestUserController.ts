import { TQueryFilters, TUserWithPermission } from "../../../types";

interface IGuestUserController<T, F extends TQueryFilters> {
    get(id: string): Promise<TUserWithPermission>;

}

export default IGuestUserController;
