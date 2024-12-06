import { Franchise, FranchiseDetails, Pagination } from "../../../interfaces";
import { IFranchiseRepo } from "./IFranchiseRepo";

import RepoProvider from "../../RepoProvider";
import {
    AddressModel,
    FranchiseModel, RegionModel,
    UserModel,
} from "../../../database/schema";
import {
    OrganizationModel,
} from "../../organization/database/organization_schema";
import { TListFilters } from "../../../types/common";
import { Op } from "sequelize";


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
                const res = await FranchiseModel.create({
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
                    createdBy: franchise.createdBy,
                    updatedBy: franchise.updatedBy,
                    deletedBy: franchise.deletedBy,
                });
                console.log(res);
                if (res) {
                    return res.toJSON();
                } else {
                    return null;
                }


            } else {
                //    return getSuccess
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

    async getAll(page: number, limit: number, search: string, filters: TListFilters): Promise<Pagination<Franchise>> {
        try {
            const offset = (page - 1) * limit;

            const query: any = {};

            // Add search functionality
            if (search) {
                query[Op.or] = [
                    { pocName: { [Op.iLike]: `%${search}%` } },
                    { pocEmail: { [Op.iLike]: `%${search}%` } },
                    { pocPhoneNumber: { [Op.iLike]: `%${search}%` } },
                ];
            }
            // Add filters
            if (filters) {
                Object.assign(query, filters);
            }

            const { rows: franchise, count: total } = await FranchiseModel.findAndCountAll({
                where: query,
                offset,
                limit,
                order: [['createdAt', 'DESC']],
                include: [
                    {
                        model: AddressModel,
                        as: "address",
                    },
                    {
                        model: RegionModel,
                        as: "region",
                    },
                    {
                        model: OrganizationModel,
                        as: "organization",
                    },
                ]
            }).then((res) => {
                return {
                    rows: res.rows.map((product) => product.toJSON()),
                    count: res.count
                }
            })

            const totalPages = Math.ceil(total / limit);

            return { data: franchise, total, totalPages };
        } catch (error) {
            console.log(error);
            return null;
        }
    }


    async exists(email: string): Promise<boolean> {
        try {
            const res = await FranchiseModel.findOne({
                where: { pocEmail: email },
            });
            return !!res;
        } catch (e) {
            console.log(e);
            return false;
        }

    }

    async getById(id: number): Promise<Franchise> {
        try {

            const res = (await FranchiseModel.findOne({
                where: { id: id },
                include: [
                    {
                        model: RegionModel,
                        as: "Region", // Matches the alias defined in the association
                    },
                    {
                        model: OrganizationModel,
                        as: "organization", // Matches the alias defined in the association
                    },
                    {
                        model: UserModel,
                        as: "createdByUser", // For the 'createdBy' user
                    },
                    {
                        model: UserModel,
                        as: "updatedByUser", // For the 'updatedBy' user
                    },
                    {
                        model: UserModel,
                        as: "deletedByUser", // For the 'deletedBy' user
                    },
                ],
            }));
            if (res) {
                return res.toJSON();
            }
            return res;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async getByOrganizationId(organizationId: number): Promise<Franchise[]> {
        try {
            const res = await FranchiseModel.findAll({
                where: { organizationId: organizationId },
                include: [
                    {
                        model: RegionModel,
                        as: "Region", // Matches the alias defined in the association
                    },
                    {
                        model: OrganizationModel,
                        as: "organization", // Matches the alias defined in the association
                    },
                    {
                        model: UserModel,
                        as: "createdByUser", // For the 'createdBy' user
                    },
                    {
                        model: UserModel,
                        as: "updatedByUser", // For the 'updatedBy' user
                    },
                    {
                        model: UserModel,
                        as: "deletedByUser", // For the 'deletedBy' user
                    },
                ],
            });
            if (res) {
                return res.map((franchise) => franchise.toJSON());
            } else {
                return [];
            }
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    getByRegionId(regionId: number): Promise<Franchise[]> {
        return Promise.resolve([]);
    }

}
