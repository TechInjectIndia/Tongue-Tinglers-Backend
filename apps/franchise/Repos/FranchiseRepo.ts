import { Franchise, FranchiseDetails } from "../../../interfaces";
import { IFranchiseRepo } from "./IFranchiseRepo";


export class FranchiseRepo implements IFranchiseRepo {

    create(franchise: FranchiseDetails): Promise<Franchise> {
        try {

        } catch (e) {

        }
        throw new Error("Method not implemented.");
    }

    update(franchise: Franchise): Promise<Franchise> {
        throw new Error("Method not implemented.");
    }

    delete(franchise: Franchise): Promise<Franchise> {
        throw new Error("Method not implemented.");
    }

    getAll(): Promise<Franchise[]> {
        throw new Error("Method not implemented.");
    }


    exists(email: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    getById(id: number): Promise<Franchise> {
        return Promise.resolve(undefined);
    }

    getByOrganizationId(organizationId: number): Promise<Franchise[]> {
        return Promise.resolve([]);
    }

    getByRegionId(regionId: number): Promise<Franchise[]> {
        return Promise.resolve([]);
    }

}
