import { BaseModelIdNumber, DeletionMetaData, UpdatedMetaData } from "interfaces";
import { ITEM_CATEGORY_STAUS } from "./ItemCategoryMisc";

interface IItemCategory extends BaseModelIdNumber, UpdatedMetaData, DeletionMetaData {
    id: number;
    name: string;
    status: ITEM_CATEGORY_STAUS;
}

interface ICreateItemCategory extends BaseModelIdNumber, UpdatedMetaData, DeletionMetaData {
    name: string;
    status: ITEM_CATEGORY_STAUS;
}


export { IItemCategory, ICreateItemCategory };