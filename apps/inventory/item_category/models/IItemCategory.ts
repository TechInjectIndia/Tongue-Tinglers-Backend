import { BaseMeta } from "apps/common/models/Base";
import { ITEM_CATEGORY_STAUS } from "./ItemCategoryMisc";

interface IItemCategory extends BaseMeta {
    id: number;
    name: string;
    status: ITEM_CATEGORY_STAUS;
}

interface ICreateItemCategory extends BaseMeta {
    name: string;
    status: ITEM_CATEGORY_STAUS;
}


export { IItemCategory, ICreateItemCategory };