import { ParsedFranchiseModels } from "apps/franchise_model/interface/franchiseModel";
import { MetaUser } from "apps/user/interface/user";

export interface ICheckList {
    id:number,
    title:string,
    checkPoints: Array<number>,
    franchiseModelId: number;
    createdBy?:number;
    updatedBy:number|null;
    deletedAt:Date|null;
    deletedBy:Date|null;
}

export interface checkPointsValue {
    key: number,
    value: boolean
}

export type TICheckListList = {
    total: number,
    data: ParsedChecklist[]
}

export type TICheckListPayload = {
    title:string,
    checkPoints: Array<number>,
    franchiseModelId: number;
};

export type TListFiltersICheckListt = {
    offset: number;
    limit: number;
    search?: string;
    sorting?: any;
    trashOnly?: string;
    filters?: {
        id?: number;
        title?: string;
        createdBy?: number;
        [key: string]: any;
    };
};

export interface ParsedChecklist {
    id:number,
    title:string,
    checkPoints: Array<number>,
    franchiseModelId: ParsedFranchiseModels;
    createdBy?:MetaUser;
    updatedBy:MetaUser| null;
    deletedBy:MetaUser | null;
    createdAt:Date;
    updatedAt:Date;
    deletedAt:Date | null;
}

