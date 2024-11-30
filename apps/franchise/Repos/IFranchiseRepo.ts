import { Franchise, FranchiseDetails } from "../../../interfaces";

export interface IFranchiseRepo {
    create(franchise: FranchiseDetails): Promise<Franchise>;

    update(franchise: Franchise): Promise<Franchise>;

    delete(franchise: Franchise): Promise<Franchise>;

    getById(id: number): Promise<Franchise>;

    getAll(): Promise<Franchise[]>;

    getByOrganizationId(organizationId: number): Promise<Franchise[]>;

    getByRegionId(regionId: number): Promise<Franchise[]>;

    exists(email: string): Promise<boolean>;

}
