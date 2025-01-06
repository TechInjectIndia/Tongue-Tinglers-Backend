import { IRawMaterialStockRepo } from "./IRawMaterialStockRepo";
import { IRawMaterialStockDetails, IRawMaterialStockInDetails, IReceiveRawMaterialStock } from "../models/IRawMaterialStock";
import { RawMaterialStockTable } from "../database/RawMaterialStockTable";
import { RawMaterialTable } from "../../raw_material/database/RawMaterialTable";
import { RawMaterialStockInTable } from "../database/RawMaterialStockInTable";
import { SupplierTable } from "../../supplier/database/SupplierTable";
import { FactoryGateTable } from "../../factory_gates/database/FactoryGateTable";
import { StorageLocationTable } from "../../storage_locations/database/StorageLocationTable";
import { sequelize } from "config";
import { APIResponse } from "apps/common/models/Base";
import { handleError, HelperMethods } from "apps/common/utils/HelperMethods";
import { PaginatedBaseResponse } from "interfaces";

export class PostgresRawMaterialStockRepo implements IRawMaterialStockRepo {

    async receiveStock(payload: IReceiveRawMaterialStock): Promise<APIResponse<null>> {
        try {
            const transaction = await sequelize.transaction();

            /* save raw material stock in */
            await RawMaterialStockInTable.create(payload, {
                transaction: transaction,
            });

            /* update the raw material stock */
            await RawMaterialStockTable.increment("totalStock", {
                by: payload.qty,
                where: {
                    rawMaterialId: payload.rawMaterialId,
                },
                transaction: transaction,
            });

            await transaction.commit();
            return HelperMethods.getSuccessResponse(null);
        } catch (error) {
            handleError(error);
            return HelperMethods.getErrorResponse();
        }
    }

    async getAll(page: number, pageSize: number): Promise<APIResponse<PaginatedBaseResponse<IRawMaterialStockDetails> | null>> {
        try {
            const offset = (page - 1) * pageSize;
            const { count, rows } = await RawMaterialStockTable.findAndCountAll({
                limit: pageSize,
                offset: offset,
                order: [['createdAt', 'DESC']],
                include: [{
                    model: RawMaterialTable,
                    attributes: ['name', 'msq'],
                    required: true,
                }],
            });

            const totalPages = Math.ceil(count / pageSize);

            const data: IRawMaterialStockDetails[] = [];

            for (const item of rows) {
                data.push({
                    id: item.getDataValue('id'),
                    rawMaterialId: item.getDataValue('rawMaterialId'),
                    //@ts-ignore
                    rawMaterialName: item.RawMaterialTable.getDataValue('name'),
                    //@ts-ignore
                    msq: item.RawMaterialTable.getDataValue('msq'),
                    totalStock: item.getDataValue('totalStock'),
                    assignedStock: item.getDataValue('assignedStock'),
                    createdAt: item.getDataValue('createdAt'),
                    createdBy: item.getDataValue('createdBy'),
                    updatedAt: item.getDataValue('updatedAt'),
                    updatedBy: item.getDataValue('updatedBy'),
                    deletedAt: item.getDataValue('deletedAt'),
                    deletedBy: item.getDataValue('deletedBy'),
                });
            }

            return HelperMethods.getSuccessResponse({
                currentPage: page,
                totalData: count,
                totalPages: totalPages,
                data: data,
            });

        } catch (error) {
            handleError(error);
            return HelperMethods.getErrorResponse();
        }
    }

    async getById(id: number): Promise<APIResponse<IRawMaterialStockDetails | null>> {
        try {
            const result = await RawMaterialStockTable.findByPk(id, {
                include: [{
                    model: RawMaterialTable,
                    attributes: ['name'],
                }],
            });


            if (!result) {
                return HelperMethods.getErrorResponse("Raw Material Stock not found");
            }
            return HelperMethods.getSuccessResponse(
                {
                    id: result.getDataValue('id'),
                    rawMaterialId: result.getDataValue('rawMaterialId'),
                    //@ts-ignore
                    rawMaterialName: result.RawMaterialTable.getDataValue('name'),
                    //@ts-ignore
                    msq: result.RawMaterialTable.getDataValue('msq'),
                    totalStock: result.getDataValue('totalStock'),
                    assignedStock: result.getDataValue('assignedStock'),
                    createdAt: result.getDataValue('createdAt'),
                    createdBy: result.getDataValue('createdBy'),
                    updatedAt: result.getDataValue('updatedAt'),
                    updatedBy: result.getDataValue('updatedBy'),
                    deletedAt: result.getDataValue('deletedAt'),
                    deletedBy: result.getDataValue('deletedBy'),
                }
            );
        } catch (error) {
            handleError(error);
            return HelperMethods.getErrorResponse();
        }
    }

    async getStockIn(page: number, pageSize: number): Promise<APIResponse<PaginatedBaseResponse<IRawMaterialStockInDetails> | null>> {
        try {
            const offset = (page - 1) * pageSize;
            const { count, rows } = await RawMaterialStockInTable.findAndCountAll({
                limit: pageSize,
                offset: offset,
                order: [['createdAt', 'DESC']],
                include: [
                    {
                        model: RawMaterialTable,
                        attributes: ['name',],
                    },
                    {
                        model: SupplierTable,
                        attributes: ['name',],
                    },
                    {
                        model: FactoryGateTable,
                        attributes: ['name',],
                    },
                    {
                        model: StorageLocationTable,
                        attributes: ['name',],
                    },
                ],
            });

            const totalPages = Math.ceil(count / pageSize);

            const data: IRawMaterialStockInDetails[] = [];

            for (const item of rows) {
                data.push({
                    id: item.getDataValue('id'),
                    rawMaterialId: item.getDataValue('rawMaterialId'),
                    //@ts-ignore
                    rawMaterial: item.RawMaterialTable.getDataValue('name'),
                    supplierId: item.getDataValue('supplierId'),
                    //@ts-ignore
                    supplier: item.SupplierTable.getDataValue('name'),
                    unitCost: item.getDataValue('unitCost'),
                    storageLocationId: item.getDataValue('storageLocationId'),
                    //@ts-ignore
                    storageLocation: item.StorageLocationTable.getDataValue('name'),
                    factoryGateId: item.getDataValue('factoryGateId'),
                    //@ts-ignore
                    factoryGate: item.FactoryGateTable.getDataValue('name'),
                    qty: item.getDataValue('qty'),
                    createdAt: item.getDataValue('createdAt'),
                    createdBy: item.getDataValue('createdBy'),
                    updatedAt: item.getDataValue('updatedAt'),
                    updatedBy: item.getDataValue('updatedBy'),
                    deletedAt: item.getDataValue('deletedAt'),
                    deletedBy: item.getDataValue('deletedBy'),
                });
            }

            return HelperMethods.getSuccessResponse({
                currentPage: page,
                totalData: count,
                totalPages: totalPages,
                data: data,
            });

        } catch (error) {
            handleError(error);
            return HelperMethods.getErrorResponse();
        }
    }

}