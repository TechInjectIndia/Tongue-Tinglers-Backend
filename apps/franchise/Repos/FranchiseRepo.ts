
import { IFranchiseRepo } from "./IFranchiseRepo";

import RepoProvider from "../../RepoProvider";
// import {
//   AddressModel,
//   FranchiseModel,
//   RegionModel,
//   UserModel,
// } from "../../../database/schema";
// import { OrganizationModel } from "../../organization/database/organization_schema";
// import { TListFilters } from "../../../types/common";
// import { Op } from "sequelize";
// import { parseFranchise } from "../parser/franchiseParser";
// import { getUserName } from "../../common/utils/commonUtils";
import { Franchise, FranchiseDetails, ParsedFranchise } from "../interface/Franchise";
import { Pagination, TListFilters } from "apps/common/models/common";
import { getUserName } from "apps/common/utils/commonUtils";
import { Op } from "sequelize";
import { parseFranchise } from "../parser/franchiseParser";
import { UserModel } from "apps/user/models/UserTable";
import { FranchiseModel } from "../models/FranchiseTable";
import { RegionModel } from "apps/region/models/RegionTable";
import { OrganizationModel } from "apps/organization/models/OrganizationTable";
import { AddressModel } from "apps/address/models/AddressTable";

export class FranchiseRepo implements IFranchiseRepo {
  async create(franchise: FranchiseDetails, userId: number, options?: { transaction?: any }): Promise<Franchise | null> {
    try {
      const { transaction } = options || {};
      const user = await UserModel.findByPk(userId, { transaction });
      if (!user) {
        throw new Error(`User with ID ${userId} not found.`);
      }
      const existFranchise = await this.exists(franchise.pocEmail);
      if (!existFranchise) {
        const addressId = (
          await RepoProvider.address.create(franchise.location, { transaction })
        ).id;
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
        }, {
          userId: user.id,
          userName: getUserName(user)
        });

        console.log(res);

        if (res) {
          return res.toJSON();
        } else {
          return null;
        }
      } else {
        console.log("exist");

        //    return getSuccess
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async update(franchise: Franchise): Promise<Franchise> {
    // try {
    //   const user = await UserModel.findByPk(userId);
    //   if (!user) {
    //     throw new Error(`User with ID ${userId} not found.`);
    //   }

    //   const existingFranchise = await FranchiseModel.findByPk(franchiseId);
    //   if (!existingFranchise) {
    //     throw new Error(`Franchise with ID ${franchiseId} not found.`);
    //   }

    //   // Update Address (if provided)
    //   let addressId = existingFranchise.location;
    //   if (franchise.location) {
    //     addressId = (
    //       await RepoProvider.address.updateById(franchise.location, addressId)
    //     ).id;
    //   }

    //   // Update SM (if provided)
    //   let smIds: number[] = existingFranchise.sm || [];
    //   if (franchise.sm && franchise.sm.length > 0) {
    //     const smDetails = await RepoProvider.smRepo.saveBulk(franchise.sm);
    //     smIds = smDetails.map((sm) => sm.id);
    //   }

    //   // Update franchise details
    //   existingFranchise.set({
    //     pocName: franchise.pocName || existingFranchise.pocName,
    //     pocEmail: franchise.pocEmail || existingFranchise.pocEmail,
    //     pocPhoneNumber: franchise.pocPhoneNumber || existingFranchise.pocPhoneNumber,
    //     users: franchise.users || existingFranchise.users,
    //     regionId: franchise.regionId || existingFranchise.regionId,
    //     area: franchise.area || existingFranchise.area,
    //     agreementIds: franchise.agreementIds || existingFranchise.agreementIds,
    //     paymentIds: franchise.paymentIds || existingFranchise.paymentIds,
    //     status: franchise.status || existingFranchise.status,
    //     establishedDate: franchise.establishedDate || existingFranchise.establishedDate,
    //     organizationId: franchise.organizationId || existingFranchise.organizationId,
    //     location: addressId,
    //     sm: smIds,
    //     updatedBy: getUserName(user),
    //   });

    //   await existingFranchise.save();

    //   console.log(`Franchise with ID ${franchiseId} updated successfully.`);
    //   return existingFranchise.toJSON();
    // } catch (e) {
    //   console.error(`Error updating franchise with ID ${franchiseId}:`, e);
    //   return null;
    // }
    throw new Error("Method not implemented.");
  }

  delete(franchise: Franchise): Promise<Franchise> {
    throw new Error("Method not implemented.");
  }

  async getAll(
    page: number,
    limit: number,
    search: string,
    filters: TListFilters
  ): Promise<Pagination<ParsedFranchise>> {
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

      const { rows: franchise, count: total } =
        await FranchiseModel.findAndCountAll({
          where: query,
          offset,
          limit,
          order: [["createdAt", "DESC"]],
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
            {
              model: UserModel,
              as: "assignuser"
            }
          ],
        }).then((res) => {
          return {
            rows: res.rows.map((product) => parseFranchise(product.toJSON())),
            count: res.count,
          };
        });

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

  async getById(id: number): Promise<ParsedFranchise> {
    try {
      console.log(id);

      const res = await FranchiseModel.findOne({
        where: { id: id },
        include: [
          {
            model: RegionModel,
            as: "region", // Matches the alias defined in the association
          },
          {
            model: AddressModel,
            as: "address", // Matches the alias defined in the association
          },
          {
            model: OrganizationModel,
            as: "organization",
            include: [
              {
                model: AddressModel,
                as: "billingAddress", // Include billing address
              },
              {
                model: UserModel,
                as: "user", // Include root user
              },
              {
                model: AddressModel,
                as: "shippingAddresses", // Include shipping addresses
                through: { attributes: [] }, // For many-to-many relationships
              },
              {
                model: OrganizationModel,
                as: "masterFranchise",
                attributes: ["id", "name"], // Include master franchise (if applicable)
              },
              {
                model: UserModel,
                as: "createdByUser", // Include createdByUser
              },
              {
                model: UserModel,
                as: "updatedByUser", // Include updatedByUser
              },
              {
                model: UserModel,
                as: "deletedByUser", // Include deletedByUser
              },
            ],
          },
          {
            model: UserModel,
            as: "createdByUser", // For the 'createdBy' user
          },
          {
            model: UserModel,
            as: "assignuser"
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
        return parseFranchise(res.toJSON());
      } else {
        return null;
      }
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
            as: "assignuser"
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
