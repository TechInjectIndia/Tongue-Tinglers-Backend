import { BaseModelIdNumber, DeletionMetaData, UpdatedMetaData } from "interfaces";

import { RAW_MATERIAL_STAUS } from "./RawMaterialMisc";



interface ICreateRawMaterial {
    name: string;
    categoryId: number;
    unitId: number;
    sku: string;
    msq: number;
    status: RAW_MATERIAL_STAUS;
    priceData: ICreateRawMaterialPrice[];
    createdBy: number;
}

interface IRawMaterial extends Omit<ICreateRawMaterial, "priceData">, BaseModelIdNumber, UpdatedMetaData, DeletionMetaData {
    id: number;
}

interface IRawMaterialDetails extends IRawMaterial {
    unitName: string;
    categoryName: string;
    priceData: IRawMaterialPriceDetails[];
}

interface ICreateRawMaterialPrice {
    price: number;
    moq: number;
    supplierId: number;
    rawMaterialId: number;
    createdBy: number;
}

interface IRawMaterialPrice extends ICreateRawMaterialPrice, BaseModelIdNumber, UpdatedMetaData, DeletionMetaData {
}

interface IRawMaterialPriceDetails {
    price: number;
    moq: number;
    supplierId: number;
    supplier: string;
    rawMaterialId: number;
    rawMaterial: string;
}

export { IRawMaterial, ICreateRawMaterial, IRawMaterialDetails, IRawMaterialPriceDetails, IRawMaterialPrice, ICreateRawMaterialPrice };