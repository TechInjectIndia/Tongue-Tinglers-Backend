import { UniqueConstraintError } from "sequelize";
import { SupplierTable } from "../../supplier/database/SupplierTable";
import { PurchaseInvoiceTable } from "../database/PurchaseInvoiceTable";
import { IPurchaseInvoiceRequest, IPurchaseInvoiceResponse } from "../models/IPurchaseInvoice";
import { PURCHASE_INVOICE_STATUS } from "../models/PurchaseInvoiceMisc";
import { IPurchaseInvoiceRepo } from "./IPurchaseInvoiceRepo";
import { RawMaterialStockInTable } from "../../raw_material_stock/database/RawMaterialStockInTable";
import { RawMaterialStockTable } from "../../raw_material_stock/database/RawMaterialStockTable";
import { ICreateRawMaterialStockIn } from "../../raw_material_stock/models/IRawMaterialStockIn";
import { ICreateRawMaterialRejection } from "../../raw_material_stock/models/IRawMaterialRejection";
import { ICreateRawMaterialHold } from "../../raw_material_stock/models/IRawMaterialHold";
import { RawMaterialRejectionTable } from "../../raw_material_stock/database/RawMaterialRejectionTable";
import { RawMaterialHoldTable } from "../../raw_material_stock/database/RawMaterialHoldTable";
import { RawMaterialPriceTable } from "../../raw_material/database/RawMaterialPriceTable";
import { RawMaterialTable } from "../../raw_material/database/RawMaterialTable";
import { APIResponse, PaginatedBaseResponse } from "apps/common/models/Base";
import { sequelize } from "config/database";
import { handleError, HelperMethods } from "apps/common/utils/HelperMethods";
import { ICreateDebitNote } from "apps/inventory/debit_note/models/IDebitNote";
import { DebitNoteTable } from "apps/inventory/debit_note/database/DebitNoteTable";

export class PostgresPurchaseInvoiceRepo implements IPurchaseInvoiceRepo {

    async create(purchaseInvoice: IPurchaseInvoiceRequest): Promise<APIResponse<null>> {

        try {
            const transaction = await sequelize.transaction();

            /* save the purchase invoice */
            const invoice = await PurchaseInvoiceTable.create({
                invoiceNumber: purchaseInvoice.invoiceNumber,
                invoiceDate: purchaseInvoice.invoiceDate,
                supplierId: purchaseInvoice.supplierId,
                status: PURCHASE_INVOICE_STATUS.ACTIVE,
                createdBy: purchaseInvoice.createdBy,
                poNumber: purchaseInvoice.poNumber,
                poDate: purchaseInvoice.poDate,
                purchasedById: purchaseInvoice.purchasedById,
            }, {
                transaction: transaction,
            });


            /* rejection data */
            const rejectionData: ICreateRawMaterialRejection[] = [];
            /* hold data */
            const holdData: ICreateRawMaterialHold[] = [];

            /* save the raw material stock in entry */
            const stockInData: ICreateRawMaterialStockIn[] = [];


            for (const item of purchaseInvoice.rawMaterials) {
                stockInData.push({
                    rawMaterialId: item.rawMaterialId,
                    qty: item.totalQty,
                    price: item.price,
                    storageLocationId: item.storageLocationId,
                    factoryGateId: purchaseInvoice.factoryGateId,
                    supplierId: purchaseInvoice.supplierId,
                    purchaseInvoiceId: invoice.getDataValue("id"),
                    createdBy: purchaseInvoice.createdBy,
                });


                if (item.rejectedQty > 0) {
                    rejectionData.push({
                        rawMaterialId: item.rawMaterialId,
                        purchaseInvoiceId: invoice.getDataValue("id"),
                        totalQty: item.totalQty,
                        rejectedQty: item.rejectedQty,
                        rejectionReason: (item.rejectionReason?.trim().length ?? 0) > 0 ? item.rejectionReason!.trim() : null,
                        rejectedById: item.rejectedById,
                        createdBy: purchaseInvoice.createdBy,
                    });
                }

                if (item.holdQty > 0) {
                    holdData.push({
                        rawMaterialId: item.rawMaterialId,
                        purchaseInvoiceId: invoice.getDataValue("id"),
                        totalQty: item.totalQty,
                        holdQty: item.holdQty,
                        holdReason: (item.holdReason?.trim().length ?? 0) > 0 ? item.holdReason!.trim() : null,
                        holdById: item.holdById,
                        createdBy: purchaseInvoice.createdBy,
                    });
                }

            }
            await RawMaterialStockInTable.bulkCreate(stockInData, {
                transaction: transaction,
            });

            /* update the raw material stock */

            /* TODO: optimize this, if possible */

            for (const item of purchaseInvoice.rawMaterials) {

                await RawMaterialStockTable.increment("totalStock", {
                    by: item.totalQty - (item.rejectedQty + item.holdQty),
                    where: {
                        rawMaterialId: item.rawMaterialId,
                    },
                    transaction: transaction,
                });
            }

            /* if required, create the rejection */
            await RawMaterialRejectionTable.bulkCreate(rejectionData, {
                transaction: transaction,
            });

            /* if required, create the hold */
            await RawMaterialHoldTable.bulkCreate(holdData, {
                transaction: transaction,
            });


            /* if required create the debit notes */
            const debitNoteData: ICreateDebitNote[] = [];
            let actualPrice: number = 0;
            let purchasedPrice: number = 0;
            let rawMaterial: RawMaterialTable | null;
            let rawMaterialPrice: RawMaterialPriceTable | null;

            let gstPercentage = 0;




            /* TODO: optimize this, if possible */
            for (const item of purchaseInvoice.rawMaterials) {

                /* get raw material */
                rawMaterial = await RawMaterialTable.findByPk(item.rawMaterialId);

                if (!rawMaterial) {
                    return HelperMethods.getErrorResponse();
                }


                /* get actual price */
                rawMaterialPrice = await RawMaterialPriceTable.findOne({
                    where: {
                        supplierId: purchaseInvoice.supplierId,
                        rawMaterialId: item.rawMaterialId,

                    }
                });


                gstPercentage = parseFloat(rawMaterial.dataValues.gstPercentage.toString());

                if (gstPercentage > 0) {
                    actualPrice = Number((
                        parseFloat(rawMaterialPrice!.dataValues.price.toString())
                        + (parseFloat(rawMaterial.dataValues.gstPercentage.toString()) / 100)
                        * (parseFloat(rawMaterialPrice!.dataValues.price.toString()))
                    ).toFixed(2));
                }
                else {
                    actualPrice = Number(rawMaterialPrice!.dataValues.price.toString());
                }

                purchasedPrice = Number((item.price / item.totalQty).toFixed(2));

                if (actualPrice < purchasedPrice) {
                    debitNoteData.push({
                        purchaseInvoiceId: invoice.dataValues.id,
                        qty: item.totalQty,
                        rawMaterialId: item.rawMaterialId,
                        actualPrice: actualPrice,
                        purchasedPrice: purchasedPrice,
                        createdBy: purchaseInvoice.createdBy,
                    });
                }

            }

            for (const item of debitNoteData) {
                await DebitNoteTable.create(item, {
                    transaction: transaction,
                });
            }


            await transaction.commit();

            return HelperMethods.getSuccessResponse(null);

        } catch (error) {
            handleError(error);

            if (error instanceof UniqueConstraintError) {
                if (error.errors[0].path === 'invoiceNumber') {
                    return HelperMethods.getErrorResponse('Invoice number already exists');
                }
                else if (error.errors[0].path === 'poNumber') {
                    return HelperMethods.getErrorResponse('PO number already exists');
                }
            }
            return HelperMethods.getErrorResponse();
        }
    }

    async getAll(page: number, pageSize: number): Promise<APIResponse<PaginatedBaseResponse<IPurchaseInvoiceResponse> | null>> {
        try {
            const offset = (page - 1) * pageSize;
            const { count, rows } = await PurchaseInvoiceTable.findAndCountAll({
                limit: pageSize,
                offset: offset,
                order: [['createdAt', 'DESC']],
                where: {
                    status: PURCHASE_INVOICE_STATUS.ACTIVE
                },
                include: {
                    model: SupplierTable,
                    attributes: ["name",],
                    as: "supplier",
                }
            });

            const data: IPurchaseInvoiceResponse[] = [];

            for (const item of rows) {
                data.push({
                    ...item.get(),
                    supplier: item.supplier.dataValues.name,
                });
            }


            const totalPages = Math.ceil(count / pageSize);

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

    async getBy(id: number): Promise<APIResponse<IPurchaseInvoiceResponse | null>> {
        try {
            const result = await PurchaseInvoiceTable.findByPk(id, {
                include: {
                    model: SupplierTable,
                    attributes: ["name",],
                    as: "supplier",
                }
            });
            if (result) {

                return HelperMethods.getSuccessResponse({
                    ...result.get(),
                    supplier: result.supplier.dataValues.name,
                });
            }
            else {
                return HelperMethods.getErrorResponse("No record found");
            }
        } catch (error) {
            handleError(error);
            return HelperMethods.getErrorResponse();
        }
    }

}






