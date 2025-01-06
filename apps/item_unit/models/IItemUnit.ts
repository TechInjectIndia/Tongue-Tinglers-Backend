import { BaseModelIdNumber, DeletionMetaData, UpdatedMetaData } from "interfaces"; import { ITEM_UNIT_STAUS } from "./ItemUnitMisc";

interface IItemUnit extends BaseModelIdNumber, UpdatedMetaData, DeletionMetaData {
    id: number;
    name: string;
    status: ITEM_UNIT_STAUS;
}

interface ICreateItemUnit {
    name: string;
    status: ITEM_UNIT_STAUS;
}

interface IUpdateItemUnit {
    name: string;
    status: ITEM_UNIT_STAUS;
}


export { IItemUnit, ICreateItemUnit, IUpdateItemUnit };