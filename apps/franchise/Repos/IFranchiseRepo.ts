import { Franchise, FranchiseDetails, Pagination } from "../../../interfaces";
import { TListFilters } from "../../../types";

export interface IFranchiseRepo {
    create(franchise: FranchiseDetails): Promise<Franchise | null>;

    update(franchise: Franchise): Promise<Franchise>;

    delete(franchise: Franchise): Promise<Franchise>;

    getById(id: number): Promise<Franchise>;


    getAll(page: number, limit: number, search: string, filters: object);
    getByOrganizationId(organizationId: number): Promise<Franchise[]>;

    getByRegionId(regionId: number): Promise<Franchise[]>;

    exists(email: string): Promise<boolean>;

}
