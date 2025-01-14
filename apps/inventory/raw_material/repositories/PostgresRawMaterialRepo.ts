import { ItemCategoryTable } from "../../item_category/database/ItemCategoryTable";
import { ItemUnitTable } from "../../item_unit/database/ItemUnitTable";
import { RawMaterialTable } from "../database/RawMaterialTable";
import { ICreateRawMaterial, ICreateRawMaterialPrice, IRawMaterialDetails, IRawMaterialPriceDetails, ISingleRawMaterialDetails } from "../models/IRawMaterial";
import { RAW_MATERIAL_STAUS } from "../models/RawMaterialMisc";
import { IRawMaterialRepo } from "./IRawMaterialRepo";
import { Op, UniqueConstraintError } from "sequelize";
import { RawMaterialPriceTable } from "../database/RawMaterialPriceTable";
import { APIResponse, PaginatedBaseResponse } from "apps/common/models/Base";
import { sequelize } from "config/database";
import { handleError, HelperMethods } from "apps/common/utils/HelperMethods";
import { SupplierTable } from "apps/inventory/supplier/database/SupplierTable";
import { RawMaterialStockTable } from "apps/inventory/raw_material_stock/database/RawMaterialStockTable";

export class PostgresRawMaterialRepo implements IRawMaterialRepo {

    async create(payload: ICreateRawMaterial): Promise<APIResponse<RawMaterialTable | null>> {
        try {

            const transaction = await sequelize.transaction();

            const savedRawMaterial = await RawMaterialTable.create(payload, {
                transaction: transaction,
            });

            const stockPayload: any = {
                rawMaterialId: savedRawMaterial.getDataValue('id'),
                totalStock: 0,
                assignedStock: 0,
            };
            stockPayload.createdById = payload.createdBy;

            /* create raw material stock */
            await RawMaterialStockTable.create(stockPayload, {
                transaction: transaction,
            });
            /* create raw material price */

            const pricePayload: ICreateRawMaterialPrice[] = [];


            for (const data of payload.priceData) {
                pricePayload.push({
                    price: data.price,
                    moq: data.moq,
                    supplierId: data.supplierId,
                    rawMaterialId: savedRawMaterial.getDataValue('id'),
                    createdBy: payload.createdBy,
                });
            }


            await RawMaterialPriceTable.bulkCreate(pricePayload, {
                transaction: transaction,
            });


            await transaction.commit();

            return HelperMethods.getSuccessResponse(savedRawMaterial);
        } catch (error) {
            handleError(error);
            if (error instanceof UniqueConstraintError) {
                if (error.errors[0].path === 'name') {
                    return HelperMethods.getErrorResponse('Name already exists');
                }
                else if (error.errors[0].path === 'sku') {
                    return HelperMethods.getErrorResponse('SKU already exists');
                }
            }
            return HelperMethods.getErrorResponse();
        }
    }

    async update(id: number, payload: ICreateRawMaterial): Promise<APIResponse<null>> {
        try {

            const transaction = await sequelize.transaction();

            await RawMaterialTable.update(payload, {
                where: {
                    id: id
                },
                transaction: transaction
            });

            /* delete old data */
            await RawMaterialPriceTable.destroy({
                where: {
                    rawMaterialId: id
                },
                transaction: transaction
            });

            /* create raw material price */

            const pricePayload: ICreateRawMaterialPrice[] = [];


            for (const data of payload.priceData) {
                pricePayload.push({
                    price: data.price,
                    moq: data.moq,
                    supplierId: data.supplierId,
                    rawMaterialId: id,
                    createdBy: payload.updatedBy!,
                });
            }


            await RawMaterialPriceTable.bulkCreate(pricePayload, {
                transaction: transaction,
            });


            await transaction.commit();

            return HelperMethods.getSuccessResponse(null);
        } catch (error) {
            handleError(error);
            if (error instanceof UniqueConstraintError) {
                if (error.errors[0].path === 'name') {
                    return HelperMethods.getErrorResponse('Name already exists');
                }
                else if (error.errors[0].path === 'sku') {
                    return HelperMethods.getErrorResponse('SKU already exists');
                }
            }
            return HelperMethods.getErrorResponse();
        }
    }

    async getAll(page: number, pageSize: number): Promise<APIResponse<PaginatedBaseResponse<IRawMaterialDetails> | null>> {
        try {
            const offset = (page - 1) * pageSize;
            const { count, rows } = await RawMaterialTable.findAndCountAll({
                limit: pageSize,
                offset: offset,
                order: [['createdAt', 'DESC']],
                where: {
                    status: RAW_MATERIAL_STAUS.ACTIVE
                },
                include: [
                    {
                        model: ItemUnitTable,
                        attributes: ['name'],
                        as: "unit",
                    },
                    {
                        model: ItemCategoryTable,
                        attributes: ['name'],
                        as: "category",
                    },
                    {
                        model: RawMaterialPriceTable,
                        as: "prices",
                        include: [
                            {
                                model: SupplierTable,
                                attributes: ['name'],
                                as: "supplier",
                            }
                        ]
                    }
                ]
            });

            const totalPages = Math.ceil(count / pageSize);

            const data: IRawMaterialDetails[] = [];
            const priceData: IRawMaterialPriceDetails[] = [];


            for (const item of rows) {


                for (const data of item.prices) {
                    priceData.push({
                        price: data.getDataValue('price'),
                        moq: data.getDataValue('moq'),
                        supplierId: data.getDataValue('supplierId'),
                        supplier: data.supplier.getDataValue('name'),
                        rawMaterialId: item.getDataValue('id'),
                        rawMaterial: item.getDataValue('name'),
                    });
                }


                data.push({
                    id: item.getDataValue('id'),
                    name: item.getDataValue('name'),
                    unitId: item.getDataValue('unitId'),
                    categoryId: item.getDataValue('categoryId'),
                    sku: item.getDataValue('sku'),
                    msq: item.getDataValue('msq'),
                    status: item.getDataValue('status'),
                    unitName: item.unit.getDataValue('name'),
                    categoryName: item.category.getDataValue('name'),
                    hsn: item.getDataValue('hsn'),
                    gstPercentage: item.getDataValue('gstPercentage'),

                    priceData: priceData,

                    createdAt: item.getDataValue('createdAt'),
                    updatedAt: item.getDataValue('updatedAt'),
                    createdBy: item.getDataValue('createdBy'),
                    updatedBy: item.getDataValue('updatedBy'),
                    deletedBy: item.getDataValue('deletedBy'),
                    deletedAt: item.getDataValue('deletedAt'),
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

    async getById(id: number): Promise<APIResponse<IRawMaterialDetails | null>> {
        try {
            const result = await RawMaterialTable.findByPk(id, {
                include: [
                    {
                        model: RawMaterialPriceTable,
                        as: "prices",
                        include: [
                            {
                                model: SupplierTable,
                                attributes: ['name'],
                                as: "supplier"
                            }
                        ]
                    },
                    {
                        model: ItemUnitTable,
                        attributes: ['name'],
                        as: "unit",
                    },
                    {
                        model: ItemCategoryTable,
                        attributes: ['name'],
                        as: "category",
                    }
                ]
            });
            if (!result) {
                return HelperMethods.getErrorResponse("No data found");
            }


            const priceData: IRawMaterialPriceDetails[] = [];
            for (const item of result.prices) {
                priceData.push({
                    price: item.getDataValue('price'),
                    moq: item.getDataValue('moq'),
                    supplierId: item.getDataValue('supplierId'),
                    supplier: item.supplier.getDataValue('name'),
                    rawMaterialId: item.getDataValue('rawMaterialId'),
                    rawMaterial: result.getDataValue('name'),
                });
            }
            const data: IRawMaterialDetails = {
                id: result.getDataValue('id'),
                name: result.getDataValue('name'),
                unitId: result.getDataValue('unitId'),
                categoryId: result.getDataValue('categoryId'),
                sku: result.getDataValue('sku'),
                msq: result.getDataValue('msq'),
                status: result.getDataValue('status'),
                unitName: result.unit.getDataValue('name'),
                categoryName: result.category.getDataValue('name'),
                priceData: priceData,
                hsn: result.getDataValue('hsn'),
                gstPercentage: result.getDataValue('gstPercentage'),
                createdAt: result.getDataValue('createdAt'),
                updatedAt: result.getDataValue('updatedAt'),
                createdBy: result.getDataValue('createdBy'),
                updatedBy: result.getDataValue('updatedBy'),
                deletedBy: result.getDataValue('deletedBy'),
                deletedAt: result.getDataValue('deletedAt'),
            };

            return HelperMethods.getSuccessResponse(data);
        } catch (error) {
            handleError(error);
            return HelperMethods.getErrorResponse();
        }
    }


    async delete(ids: number[], deletedById: number): Promise<APIResponse<null>> {
        try {
            const transaction = await sequelize.transaction();
            await RawMaterialTable.update({
                status: RAW_MATERIAL_STAUS.DELETED,
                deletedBy: deletedById,
            }, {
                where: {
                    id: {
                        [Op.in]: ids
                    }
                },
                transaction: transaction
            });
            return HelperMethods.getSuccessResponse(null);
        } catch (error) {
            handleError(error);
            return HelperMethods.getErrorResponse();
        }
    }

    async search(text: string, supplierId?: number): Promise<APIResponse<ISingleRawMaterialDetails[] | null>> {
        try {

            /* get Raw materials */
            const result = await RawMaterialTable.findAll({
                where: {
                    name: {
                        [Op.iLike]: `%${text}%`
                    }
                },
                limit: 5,

            });


            let filteredData: ISingleRawMaterialDetails[] = [];


            for (const item of result) {
                filteredData.push(
                    {
                        categoryId: item.dataValues.categoryId,
                        categoryName: "",
                        hsn: item.dataValues.hsn,
                        id: item.dataValues.id,
                        name: item.dataValues.name,
                        price: 0,
                        deletedAt: item.dataValues.deletedAt,
                        deletedBy: item.dataValues.deletedBy,
                        status: item.dataValues.status,
                        sku: item.dataValues.sku,
                        unitId: item.dataValues.unitId,
                        unitName: "",
                        updatedAt: item.dataValues.updatedAt,
                        updatedBy: item.dataValues.updatedBy,
                        createdAt: item.dataValues.createdAt,
                        createdBy: item.dataValues.createdBy,
                        gstPercentage: item.dataValues.gstPercentage,
                        msq: item.dataValues.msq,
                    }
                );
            }




            if (supplierId) {
                filteredData = [];

                /* check for suppliers */
                const linkedData = await RawMaterialPriceTable.findAll({
                    where: {
                        supplierId: supplierId,
                        rawMaterialId: {
                            [Op.in]: result.map(item => item.getDataValue('id'))
                        }
                    },
                    limit: 5,
                });


                for (const item of result) {

                    const foundData = linkedData.find(data => data.getDataValue('rawMaterialId') === item.getDataValue('id'));
                    if (!foundData) {
                        continue;
                    }


                    filteredData.push(

                        {
                            categoryId: item.dataValues.categoryId,
                            categoryName: "",
                            hsn: item.dataValues.hsn,
                            id: item.dataValues.id,
                            name: item.dataValues.name,
                            price: foundData.getDataValue('price'),
                            deletedAt: item.dataValues.deletedAt,
                            deletedBy: item.dataValues.deletedBy,
                            status: item.dataValues.status,
                            sku: item.dataValues.sku,
                            unitId: item.dataValues.unitId,
                            unitName: "",
                            updatedAt: item.dataValues.updatedAt,
                            updatedBy: item.dataValues.updatedBy,
                            createdAt: item.dataValues.createdAt,
                            createdBy: item.dataValues.createdBy,
                            gstPercentage: item.dataValues.gstPercentage,
                            msq: item.dataValues.msq,

                        }
                    );
                }


            }


            return HelperMethods.getSuccessResponse(filteredData);
        } catch (error) {
            handleError(error);
            return HelperMethods.getErrorResponse();
        }
    }
}