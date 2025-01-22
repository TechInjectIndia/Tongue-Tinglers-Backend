import {Op, UniqueConstraintError} from "sequelize";
import {FranchiseModel} from "apps/franchise/models/FranchiseTable";
import {APIResponse} from "../../common/models/Base";
import {
    COMMISSION_PAID_STATUS,
    CommissionEntityMappingModel,
    ICommissionEntityMapping,
    CommissionVoucherCreationAttributes,
    COMMISSION_VOUCHER_ENTITIES,
} from "../model/CommissionEntityMappingTable";
import {CommissionTable} from "../model/CommmisionTable";
import {ICommissionRepo} from "./ICommissionRepo";
import {OrganizationModel} from "apps/organization/models/OrganizationTable";
import {handleError, HelperMethods} from "apps/common/utils/HelperMethods";
import {
    CommissionType,
    ICommission,
} from "../interface/Commission";
import { CommissionVoucherModel, ICommissionVoucher } from "../model/CommissionVoucherTable";
import { OrderModel } from "apps/order/models/OrderTable";
import CommissionPayoutModel from "../model/CommissionPayoutTable";

export class PostgresCommissionRepo implements ICommissionRepo {

    async getCommissionMappings(): Promise<APIResponse<ICommissionEntityMappingResponse[]>> {
        try {
            const result = await CommissionEntityMappingModel.findAll(
                {
                    include: [
                        {
                            model: CommissionTable,
                        },
                        {
                            model: FranchiseModel,
                            attributes: ["id", "pocName"],
                            include: [{
                                model: OrganizationModel,
                                as: "organization",
                            }]
                        },
                        {
                            model: OrganizationModel,
                        },
                        {
                            model: CommissionVoucherModel,
                            include: [{
                                model: CommissionPayoutModel,
                            }]
                        },
                    ]
                }
            );

            const response: ICommissionEntityMappingResponse[] = [];

            /* TODO: @dhruv Mandeep Singh(self), change this after the dependency is done */


            for (const commissionMapping of result) {
                response.push({
                    id: commissionMapping.id,
                    franchiseId: commissionMapping.franchiseId,
                    franchiseOrganization: {
                        id: commissionMapping["FranchiseModel"]["organization"].id,
                        name: commissionMapping["FranchiseModel"]["organization"].name,
                    },
                    commission: {
                        id: commissionMapping.commissionId,
                        title: commissionMapping["CommissionTable"].title,
                        type: commissionMapping["CommissionTable"].type,
                        eventType: commissionMapping["CommissionTable"].eventType,
                        value: commissionMapping["CommissionTable"].value,
                    },
                    organization: {
                        id: commissionMapping.organizationId,
                        name: commissionMapping["OrganizationModel"].name,
                    },
                    appliedCommission: {
                        franchiseAmount: commissionMapping["CommissionTable"].franchiseAmount,
                        commissionAmount: commissionMapping["CommissionTable"].commissionAmount
                    },
                    // status: commissionMapping.status,
                    createdBy: commissionMapping.createdBy,
                    updatedBy: commissionMapping.updatedBy,
                    deletedBy: commissionMapping.deletedBy,
                    createdAt: commissionMapping.createdAt,
                    updatedAt: commissionMapping.updatedAt,
                    deletedAt: commissionMapping.deletedAt,
                });
            }

            // todo using hooks

            return HelperMethods.getSuccessResponse(response);

        }
        catch (error) {
            handleError(error);
            return HelperMethods.getErrorResponse();
        }
    }

    async search(searchText: string,
        type?: string): Promise<APIResponse<ICommission[]>> {

        try {

            const whereConditions: any = {};

            whereConditions.title = {
                [Op.iLike]: "%" + searchText.toLowerCase() + "%"
            };


            if (type) {
                whereConditions.eventType = type;
            }


            const result = await CommissionTable.findAll({
                where: whereConditions
            });

            return HelperMethods.getSuccessResponse(result);

        }
        catch (error) {
            handleError(error, searchText, type);
            return HelperMethods.getErrorResponse();
        }
    }

    async createCommissionMapping(mapEntities: CommissionVoucherCreationAttributes[],
        options?: { transaction?: any }): Promise<APIResponse<boolean>> {
        try {
            const {transaction} = options || {};
           const CommissionEntityMappingData =  await CommissionEntityMappingModel.bulkCreate(mapEntities,
                {transaction});


                CommissionEntityMappingData.forEach(async(data)=>{
                    //Get percentage is stored somewhere
                    const percentage = 10;
                    let finalAmount = 0;
                    const commission:CommissionTable = await CommissionTable.findByPk(data.commissionId);

                 if(commission.type=== CommissionType.PERCENTAGE){
                        finalAmount = (commission.value * percentage)/100;
                    }
                    await CommissionVoucherModel.create({
                        relationId: data.id,
                        entityId:data.franchiseId,
                        entityType: COMMISSION_VOUCHER_ENTITIES.FRANCHISE_COMMISSION,
                        status: COMMISSION_PAID_STATUS.PENDING,
                        value:finalAmount,
                        createdBy:data.createdBy,
                    },{transaction});
                })

            return HelperMethods.getSuccessResponse<boolean>(true);
        }
        catch (error) {
            handleError(error, mapEntities);
            return HelperMethods.getErrorResponse();
        }
    }

    async updateCommissionMapping(id: number,
        mapEntity: ICommissionEntityMapping): Promise<APIResponse<boolean>> {
        try {
            await CommissionEntityMappingModel.update(mapEntity, {
                where: {
                    id: id
                }
            });
            return HelperMethods.getSuccessResponse<boolean>(true);
        }
        catch (error) {
            handleError(error, id, mapEntity);
            return HelperMethods.getErrorResponse();
        }
    }

    async delete(ids: number[],
        deletedById: number): Promise<APIResponse<boolean>> {
        try {
            await CommissionTable.update(
                {
                    deletedBy: deletedById,
                    deletedAt: new Date(),
                }, {
                    where: {
                        id: ids
                    }
                });
            return HelperMethods.getSuccessResponse<boolean>(true);
        }
        catch (error) {
            handleError(error, ids, deletedById);
            return HelperMethods.getErrorResponse(error.toString());
        }
    }

    async getAll(): Promise<APIResponse<ICommission[]>> {
        try {
            const result = await CommissionTable.findAll({
                order: [["updated_at", "DESC"]]
            });
            return HelperMethods.getSuccessResponse(result);
        }
        catch (error) {
            handleError(error);
            return HelperMethods.getErrorResponse(error.toString());
        }
    }

    async getById(id: number): Promise<APIResponse<CommissionTable>> {
        try {
            const result = await CommissionTable.findByPk(id);
            return HelperMethods.getSuccessResponse(result);
        }
        catch (error) {
            handleError(error, id);
            return HelperMethods.getErrorResponse(error.toString());
        }
    }

    async create(commission: CommissionTable): Promise<APIResponse<CommissionTable>> {
        try {
            const saved = await CommissionTable.create(commission);
            return HelperMethods.getSuccessResponse<CommissionTable>(saved);
        }
        catch (error) {
            handleError(error, commission);
            if (error instanceof UniqueConstraintError) {
                return HelperMethods.getErrorResponse('Title already exists');
            }
            return HelperMethods.getErrorResponse();
        }
    }

    async update(id: number,
        commission: CommissionTable): Promise<APIResponse<boolean>> {
        try {
            await CommissionTable.update(commission, {
                where: {
                    id: id
                }
            });
            return HelperMethods.getSuccessResponse<boolean>(true);
        }
        catch (error) {
            handleError(error, id, commission);
            if (error instanceof UniqueConstraintError) {
                return HelperMethods.getErrorResponse('Title already exists');
            }
            return HelperMethods.getErrorResponse();
        }
    }

    async isTitleAlreadyExists(title: string): Promise<APIResponse<boolean>> {
        try {
            const result = await CommissionTable.count({
                where: {
                    title: {
                        [Op.iLike]: title.toLowerCase()
                    }
                }
            });
            if (result === 0) {
                return HelperMethods.getSuccessResponse<boolean>(false);
            }
            return HelperMethods.getSuccessResponse<boolean>(true,
                'Title already exists');
        }
        catch (error) {
            handleError(error, title);
            return HelperMethods.getErrorResponse();
        }
    }

    async updateCommissionEntityStatus(id: number,
        status: COMMISSION_PAID_STATUS): Promise<APIResponse<boolean>> {
        try {

            await CommissionEntityMappingModel.update({
                // status: status
            }, {
                where: {
                    id: id
                }
            });

            return HelperMethods.getSuccessResponse<boolean>(true);

        }
        catch (error) {
            handleError(error, id, status);

            return HelperMethods.getErrorResponse();
        }
    }

    async addVoucherToEntity(entityId: number, entityType: COMMISSION_VOUCHER_ENTITIES, voucherData: Partial<ICommissionVoucher>) {
    if (entityType === COMMISSION_VOUCHER_ENTITIES.ORDER_COMMISSION) {
        const order = await OrderModel.findByPk(entityId);
        if (!order) throw new Error("Order not found");

        await order.createAddVoucher({ ...voucherData });
    } else if (entityType === COMMISSION_VOUCHER_ENTITIES.FRANCHISE_COMMISSION) {
        const franchise = await FranchiseModel.findByPk(entityId);
        if (!franchise) throw new Error("Franchise not found");

        await franchise.createAddVoucher({ ...voucherData });
    }
}

}
