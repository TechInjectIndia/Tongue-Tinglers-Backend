import {Op} from "sequelize";
import {TListFilters} from "../../../types";
import {AddressModel, UserModel} from "../../../database/schema";
import IBaseRepo from "../controllers/controller/IController";
import {
    IOrganizationPayloadData,
    IOrganizationPayloadDataWithMeta,
    ParsedOrganization,
} from "../../../interfaces/organization";
import {OrganizationModel} from "../database/organization_schema";
import RepoProvider from "../../RepoProvider";
import {parseOrganization} from "../parser/organizationParser"

export class OrganizationRepo
    implements IBaseRepo<IOrganizationPayloadDataWithMeta, ParsedOrganization, TListFilters> {
    constructor() {
    }

    async create(
        payload: IOrganizationPayloadData,
        userId: number
    ): Promise<ParsedOrganization> {

        // todo @Nitesh this is not correct it should happen using sequelize
        // mixins
        const billingAddress = (
            await RepoProvider.address.create(payload.billingAddress)
        ).id;

        const shippingAddresses = (
            await AddressModel.bulkCreate(payload.shippingAddress)
        ).map((add) => add.id);

        const organization = await OrganizationModel.create({
            name: payload.name,
            contactPersonName: payload.contactPersonName,
            contactNumber: payload.contactNumber,
            contactEmail: payload.contactEmail,
            pan: payload.pan,
            gst: payload.gst,
            bankName: payload.bankName,
            bankAccountNumber: payload.bankAccountNumber,
            bankIFSCCode: payload.bankIFSCCode,
            billingAddressId: billingAddress,
            masterFranchiseId: payload.masterFranchiseId,
            rootUser: payload.rootUser,
            createdBy: userId,
            businessType: payload.businessType,
            type: payload.type,
        });

        await organization.addShippingAddresses(shippingAddresses);


        const organizationData = await OrganizationModel.findByPk(
            organization.id, {
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
                        as: "shippingAddresses", // The alias defined above
                        through: {attributes: []},
                    },
                    {
                        model: OrganizationModel,
                        as: "masterFranchise",
                        attributes: ["id", "name"], // Include master franchise
                                                    // (if applicable)
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
            }).then((organization) => {
            return parseOrganization(organization?.toJSON())
        })

        return organizationData
    }

    public async get(id: number): Promise<ParsedOrganization | null> {
        const organizationData = await OrganizationModel.findOne({
            where: {id},
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
                    as: "shippingAddresses", // The alias defined above
                    through: {attributes: []},
                },
                {
                    model: OrganizationModel,
                    as: "masterFranchise",
                    attributes: ["id", "name"], // Include master franchise (if
                                                // applicable)
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
        }).then((organization) => {
            return parseOrganization(organization?.toJSON())
        })
        return organizationData
    }

    public async update(id: number,
        data: any): Promise<[affectedCount: number]> {
        return await OrganizationModel.update(data, {
            where: {id},
        });
    }

    public async delete(id: any): Promise<number> {
        try {
            return await OrganizationModel.destroy({
                where: {
                    id: id,
                },
            });
        }
        catch (error) {
            console.error("Error deleting Organization:", error);
            throw new Error("Failed to delete Organization"); // Rethrow or
                                                              // handle as
                                                              // needed
        }
    }

    public async list(
        page: number,
        limit: number,
        search: string,
        filters: object
    ): Promise<any> {
        const offset = (page - 1) * limit;

        const query: any = {};

        // Add search functionality
        if (search) {
            query[Op.or] = [
                {name: {[Op.iLike]: `%${search}%`}},
                {description: {[Op.iLike]: `%${search}%`}},
            ];
        }

        // Add filters
        if (filters) {
            Object.assign(query, filters);
        }

        const {rows: organizations, count: total} =
            await OrganizationModel.findAndCountAll({
                where: query,
                offset,
                limit,
                order: [["createdAt", "DESC"]],
                include: [
                    {
                        model: AddressModel,
                        as: "billingAddress", // Billing address (one-to-one
                                              // association)
                        attributes: {exclude: []}, // Include all fields of the
                                                   // address
                    },
                    {
                        model: AddressModel,
                        as: "shippingAddresses", // Shipping addresses
                                                 // (many-to-many association)
                        through: {
                            attributes: [], // Exclude join table data
                        },
                        attributes: {exclude: []}, // Include all fields of the
                                                   // address
                    },
                    {
                        model: UserModel,
                        as: "user", // Root user
                        attributes: ["id", "firstName", "lastName", "email"],
                    },
                    {
                        model: OrganizationModel,
                        as: "masterFranchise", // Master franchise
                        attributes: ["id", "name"],
                    },
                    {
                        model: UserModel,
                        as: "createdByUser", // Created by
                        attributes: ["id", "firstName", "lastName", "email"],
                    },
                    {
                        model: UserModel,
                        as: "updatedByUser", // Updated by
                        attributes: ["id", "firstName", "lastName", "email"],
                    },
                    {
                        model: UserModel,
                        as: "deletedByUser", // Deleted by
                        attributes: ["id", "firstName", "lastName", "email"],
                    },
                ],
            }).then((res) => {
                return {
                    rows: res.rows.map((organization) => parseOrganization(
                        organization.toJSON())),
                    count: res.count,
                };
            });

        const totalPages = Math.ceil(total / limit);
        return {data: organizations, total, totalPages};
    }


    public async getByRootUser(user_id: number): Promise<ParsedOrganization | null> {
        try {
            // Add search functionality
            const organization =
                await OrganizationModel.findOne({
                    where: {
                        rootUser: user_id
                    },
                    order: [["createdAt", "DESC"]],
                    include: [
                        {
                            model: AddressModel,
                            as: "billingAddress", // Billing address (one-to-one
                                                  // association)
                            attributes: {exclude: []}, // Include all fields of
                                                       // the address
                        },
                        {
                            model: AddressModel,
                            as: "shippingAddresses", // Shipping addresses
                                                     // (many-to-many
                                                     // association)
                            through: {
                                attributes: [], // Exclude join table data
                            },
                            attributes: {exclude: []}, // Include all fields of
                                                       // the address
                        },
                        {
                            model: UserModel,
                            as: "user", // Root user
                            attributes: ["id", "firstName", "lastName",
                                "email"],
                        },
                        {
                            model: OrganizationModel,
                            as: "masterFranchise", // Master franchise
                            attributes: ["id", "name"],
                        },
                        {
                            model: UserModel,
                            as: "createdByUser", // Created by
                            attributes: ["id", "firstName", "lastName",
                                "email"],
                        },
                        {
                            model: UserModel,
                            as: "updatedByUser", // Updated by
                            attributes: ["id", "firstName", "lastName",
                                "email"],
                        },
                        {
                            model: UserModel,
                            as: "deletedByUser", // Deleted by
                            attributes: ["id", "firstName", "lastName",
                                "email"],
                        },
                    ],
                }).then((res) => {
                    console.log(res)
                    return parseOrganization(res)
                });

            return organization ?? null;
        }
        catch (e) {
            console.log(e)
            return null
        }
    }
}
