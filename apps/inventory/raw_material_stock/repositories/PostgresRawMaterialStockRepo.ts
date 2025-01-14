import { IRawMaterialStockRepo } from "./IRawMaterialStockRepo";
import { IRawMaterialStockDetails, IRawMaterialStockInDetails, IReceiveRawMaterialStock } from "../models/IRawMaterialStock";
import { RawMaterialStockTable } from "../database/RawMaterialStockTable";
import { RawMaterialTable } from "../../raw_material/database/RawMaterialTable";
import { RawMaterialStockInTable } from "../database/RawMaterialStockInTable";
import { SupplierTable } from "../../supplier/database/SupplierTable";
import { FactoryGateTable } from "../../factory_gates/database/FactoryGateTable";
import { StorageLocationTable } from "../../storage_locations/database/StorageLocationTable";
import { APIResponse, PaginatedBaseResponse } from "apps/common/models/Base";
import { handleError, HelperMethods } from "apps/common/utils/HelperMethods";

export class PostgresRawMaterialStockRepo implements IRawMaterialStockRepo {

    async receiveStock(payload: IReceiveRawMaterialStock): Promise<APIResponse<null>> {
        try {
            // const transaction = await sequelizeInit.transaction();

            // /* save the purchase invoice */
            // const invoice = await PurchaseInvoiceTable.create({
            //     invoiceDate: payload.invoiceDate,
            //     supplierId: payload.supplierId,
            //     status: PURCHASE_INVOICE_STATUS.ACTIVE,
            //     createdBy: payload.createdBy,
            //     invoiceNumber: payload.invoiceNumber,
            // }, {
            //     transaction: transaction,
            // });


            // /* save raw material stock in */
            // await RawMaterialStockInTable.create(payload, {
            //     transaction: transaction,
            // });

            // /* update the raw material stock */
            // await RawMaterialStockTable.increment("totalStock", {
            //     by: payload.qty,
            //     where: {
            //         rawMaterialId: payload.rawMaterialId,
            //     },
            //     transaction: transaction,
            // });

            // await transaction.commit();
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
                    as: "rawMaterial",
                }],
            });

            const totalPages = Math.ceil(count / pageSize);

            const data: IRawMaterialStockDetails[] = [];

            for (const item of rows) {
                data.push({
                    id: item.getDataValue('id'),
                    rawMaterialId: item.getDataValue('rawMaterialId'),
                    rawMaterialName: item.rawMaterial.dataValues.name,
                    msq: item.rawMaterial.dataValues.msq,
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

    async getBy(id: number): Promise<APIResponse<IRawMaterialStockDetails | null>> {
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
                    rawMaterialName: result.rawMaterial.getDataValue('name'),
                    msq: result.rawMaterial.getDataValue('msq'),
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
                        as: "rawMaterial",
                    },
                    {
                        model: SupplierTable,
                        attributes: ['name',],
                        as: "supplier",
                    },
                    {
                        model: FactoryGateTable,
                        attributes: ['name',],
                        as: "factoryGate",
                    },
                    {
                        model: StorageLocationTable,
                        attributes: ['name',],
                        as: "storageLocation",
                    },
                ],
            });

            const totalPages = Math.ceil(count / pageSize);

            const data: IRawMaterialStockInDetails[] = [];

            for (const item of rows) {
                data.push({
                    id: item.getDataValue('id'),
                    rawMaterialId: item.getDataValue('rawMaterialId'),
                    rawMaterial: item.rawMaterial.getDataValue('name'),
                    supplierId: item.getDataValue('supplierId'),
                    supplier: item.supplier.getDataValue('name'),
                    price: item.getDataValue('price'),
                    storageLocationId: item.getDataValue('storageLocationId'),
                    storageLocation: item.storageLocation?.getDataValue('name') ?? null,
                    factoryGateId: item.getDataValue('factoryGateId'),
                    factoryGate: item.factoryGate.getDataValue('name'),
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