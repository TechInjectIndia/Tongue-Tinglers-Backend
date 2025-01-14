import { APIResponse, PaginatedBaseResponse } from "apps/common/models/Base";
import { PurchaseInvoiceTable } from "../../purchase_invoice/database/PurchaseInvoiceTable";
import { RawMaterialTable } from "../../raw_material/database/RawMaterialTable";
import { SupplierTable } from "../../supplier/database/SupplierTable";
import { DebitNoteTable } from "../database/DebitNoteTable";
import { DEBIT_NOTE_STATUS } from "../models/DebitNoteMisc";
import { ICreateDebitNote, IDebitNoteOverviewResponse, IDebitNoteResponse, IMarkDebitNotePaid } from "../models/IDebitNote";
import { IDebitNoteRepo } from "./IDebitNoteRepo";
import { UniqueConstraintError, } from "sequelize";
import { handleError, HelperMethods } from "apps/common/utils/HelperMethods";

export class PostgresDebitNoteRepo implements IDebitNoteRepo {

    async create(payload: ICreateDebitNote): Promise<APIResponse<DebitNoteTable | null>> {
        try {
            const result = await DebitNoteTable.create(payload);
            return HelperMethods.getSuccessResponse(result);
        } catch (error) {
            handleError(error);
            if (error instanceof UniqueConstraintError) {
                return HelperMethods.getErrorResponse('Category already exists');
            }
            return HelperMethods.getErrorResponse();
        }
    }

    async markPaid(payload: IMarkDebitNotePaid): Promise<APIResponse<null>> {

        try {
            await DebitNoteTable.update({
                status: DEBIT_NOTE_STATUS.PAID,
                updatedBy: payload.updatedId,
                note: payload.note,
            },
                {
                    where: {
                        purchaseInvoiceId: payload.purchaseInvoiceId
                    }
                }
            );

            return HelperMethods.getSuccessResponse(null);

        } catch (error) {
            handleError(error);
            return HelperMethods.getErrorResponse();
        }
    }




    async getAll(page: number, pageSize: number): Promise<APIResponse<PaginatedBaseResponse<IDebitNoteOverviewResponse> | null>> {
        try {
            const offset = (page - 1) * pageSize;
            const { count, rows } = await DebitNoteTable.findAndCountAll({
                limit: pageSize,
                offset: offset,
                order: [['createdAt', 'DESC']],
                where: {
                    status: DEBIT_NOTE_STATUS.UNPAID
                },

                include:
                    [
                        {
                            model: PurchaseInvoiceTable,
                            as: 'purchaseInvoice',
                            required: true,
                            include: [
                                {
                                    model: SupplierTable,
                                    as: "supplier",
                                    required: true,
                                }
                            ],

                        },
                        {
                            model: RawMaterialTable,
                            as: 'rawMaterial',
                            required: true,
                        },
                    ],
                // group: [
                //     "DebitNoteTable.id",
                //     "purchaseInvoice.id",
                //     "rawMaterial.id",
                //     'DebitNoteTable.purchaseInvoiceId',
                //     "purchaseInvoice->supplier.id"
                // ],
                // distinct: true,
            });



            /* TODO */
            const totalPages = Math.ceil(100 / pageSize);


            const data: IDebitNoteOverviewResponse[] = [];

            let debitAmount = 0;

            let groupedData: DebitNoteTable[] = [];

            let dataToIterate: DebitNoteTable[] = [];

            let fetchedItem: DebitNoteTable;


            dataToIterate = rows;

            for (const fetchedItem of dataToIterate) {


                debitAmount = 0;

                /* find all for a single */

                groupedData = dataToIterate.filter(data => data.dataValues.purchaseInvoiceId === fetchedItem.dataValues.purchaseInvoiceId);


                /* calculate  */
                for (const item of groupedData) {
                    debitAmount = Number((debitAmount + ((item.dataValues.purchasedPrice - item.dataValues.actualPrice) * item.dataValues.qty)).toFixed(2));
                }



                if (groupedData.length > 0) {
                    /* add data */
                    data.push({
                        purchaseInvoiceId: fetchedItem.dataValues.purchaseInvoiceId,
                        debitAmount: debitAmount,
                        purchaseInvoice: fetchedItem.purchaseInvoice.dataValues.invoiceNumber,
                        purchaseInvoiceDate: fetchedItem.purchaseInvoice.dataValues.invoiceDate,
                        supplier: fetchedItem.purchaseInvoice.supplier.dataValues.name,
                    });
                }



                /*delete */
                dataToIterate = dataToIterate.filter(data => data.dataValues.purchaseInvoiceId !== fetchedItem.dataValues.purchaseInvoiceId);

            }





            /* TODO */
            return HelperMethods.getSuccessResponse({
                currentPage: page,
                totalData: 100,
                totalPages: totalPages,
                data: data,
            });
        } catch (error) {
            handleError(error);
            return HelperMethods.getErrorResponse();
        }
    }

    async getByPurchasInvoiceId(purchaseInvoiceId: number): Promise<APIResponse<IDebitNoteResponse[] | null>> {
        try {
            const result = await DebitNoteTable.findAll({

                where: {
                    purchaseInvoiceId: purchaseInvoiceId,
                },

                include:
                    [
                        {
                            model: PurchaseInvoiceTable,
                            as: 'purchaseInvoice',
                            include: [
                                {
                                    model: SupplierTable,
                                    as: "supplier"
                                }
                            ],

                        },
                        {
                            model: RawMaterialTable,
                            as: 'rawMaterial',
                        },
                    ]
            });

            const data: IDebitNoteResponse[] = [];

            let debitAmount = 0;

            for (const item of result) {


                debitAmount = Number(((item.dataValues.purchasedPrice - item.dataValues.actualPrice) * item.dataValues.qty).toFixed(2));


                data.push({
                    id: item.dataValues.id,
                    purchaseInvoiceId: item.dataValues.purchaseInvoiceId,
                    actualPrice: item.dataValues.actualPrice,
                    purchasedPrice: item.dataValues.purchasedPrice,
                    status: item.dataValues.status,
                    debitAmount: debitAmount,
                    qty: item.dataValues.qty,
                    purchaseInvoice: item.purchaseInvoice.dataValues.invoiceNumber,
                    purchaseInvoiceDate: item.purchaseInvoice.dataValues.invoiceDate,
                    rawMaterial: item.rawMaterial.dataValues.name,
                    supplier: item.purchaseInvoice.supplier.dataValues.name,
                });

            }
            return HelperMethods.getSuccessResponse(data);

        } catch (error) {
            handleError(error);
            return HelperMethods.getErrorResponse();
        }
    }


}