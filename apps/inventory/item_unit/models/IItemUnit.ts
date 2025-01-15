import { BaseMeta } from "apps/common/models/Base";
import { ITEM_UNIT_STAUS } from "./ItemUnitMisc";

interface IItemUnit extends BaseMeta {
    id: number;
    name: string;
    status: ITEM_UNIT_STAUS;
}

interface ICreateItemUnit extends BaseMeta {
    name: string;
    status: ITEM_UNIT_STAUS;
}


export { IItemUnit, ICreateItemUnit };