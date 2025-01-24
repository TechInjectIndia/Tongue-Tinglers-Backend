import { Transaction } from "sequelize";
import {
    Franchise,
    FranchiseDetails,
    ParsedFranchise
} from "../interface/Franchise";
import { DTO } from "apps/common/models/DTO";


export interface IFranchiseRepo {
    create(franchise: FranchiseDetails, userId: number, options?: { transaction?: any }): Promise<Franchise | null>;

    update(franchise: Franchise): Promise<Franchise>;

    delete(franchise: Franchise): Promise<Franchise>;

    getById(id: number): Promise<ParsedFranchise>;

    getAll(page: number, limit: number, search: string, filters: object);

    getByOrganizationId(organizationId: number): Promise<Franchise[]>;

    getByRegionId(regionId: number): Promise<Franchise[]>;

    exists(email: string): Promise<boolean>;

    addUserToFranchise(id: number, payload: any, transaction?: Transaction): Promise<DTO<ParsedFranchise | null>>

}
