import { BaseMeta } from "apps/common/models/Base";
import { RAW_MATERIAL_STAUS } from "./RawMaterialMisc";



interface ICreateRawMaterial extends BaseMeta {
    name: string;
    hsn: string;
    gstPercentage: number;
    categoryId: number;
    unitId: number;
    sku: string;
    msq: number;
    status: RAW_MATERIAL_STAUS;
    priceData: ICreateRawMaterialPrice[];
}

interface IRawMaterial extends Omit<ICreateRawMaterial, "priceData">, BaseMeta {
    id: number;
}

interface IRawMaterialDetails extends IRawMaterial {
    unitName: string;
    categoryName: string;
    priceData: IRawMaterialPriceDetails[];
}

interface ISingleRawMaterialDetails extends IRawMaterial {
    unitName: string;
    categoryName: string;
    price: number;
}

interface ICreateRawMaterialPrice {
    price: number;
    moq: number;
    supplierId: number;
    rawMaterialId: number;
    createdBy: number;
}

interface IUpdateRawMaterialPrice {
    price: number;
    moq: number;
    supplierId: number;
    rawMaterialId: number;
    updatedBy: number;
}

interface IRawMaterialPrice extends BaseMeta, ICreateRawMaterialPrice {
}

interface IRawMaterialPriceDetails {
    price: number;
    moq: number;
    supplierId: number;
    supplier: string;
    rawMaterialId: number;
    rawMaterial: string;
}

export { IRawMaterial, ICreateRawMaterial, IRawMaterialDetails, IRawMaterialPriceDetails, IRawMaterialPrice, ICreateRawMaterialPrice, IUpdateRawMaterialPrice, ISingleRawMaterialDetails };