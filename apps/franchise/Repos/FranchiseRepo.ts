import { Franchise, FranchiseDetails } from "../../../interfaces";
import { IFranchiseRepo } from "./IFranchiseRepo";

import RepoProvider from "../../RepoProvider";
import { FranchiseModel } from "../../../database/schema";


export class FranchiseRepo implements IFranchiseRepo {

    async create(franchise: FranchiseDetails): Promise<Franchise | null> {
        try {
            const existFranchise = await this.exists(franchise.pocEmail);
            if (!existFranchise) {

                const addressId = (await RepoProvider.address.create(franchise.location)).id;
                let smIds: number[] = [];

                if (franchise.sm.length > 0) {
                    const smDetails = await RepoProvider.smRepo.saveBulk(franchise.sm);
                    smIds = smDetails.map((sm) => sm.id);
                }
                return (await FranchiseModel.create({
                    pocName: franchise.pocName,
                    pocEmail: franchise.pocEmail,
                    pocPhoneNumber: franchise.pocPhoneNumber,
                    users: franchise.users,
                    regionId: franchise.regionId,
                    area: franchise.area,
                    agreementIds: franchise.agreementIds,
                    paymentIds: franchise.paymentIds,
                    status: franchise.status,
                    establishedDate: franchise.establishedDate,
                    organizationId: franchise.organizationId,
                    location: addressId,
                    sm: smIds,
                })).toJSON();

            }
        } catch (e) {
            console.log(e);
            return null;
        }

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
