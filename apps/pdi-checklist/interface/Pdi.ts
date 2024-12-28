export interface IPdiList {
    id:number,
    checkpoints: checkPointsValue[]
    prospectId: number;
    createdBy?:number;
    createdAt:Date;
    updatedBy:number|null;
    updatedAt:Date;
    deletedAt:Date|null;
    deletedBy:number|null;
}

export interface checkPointsValue {
    key: number,
    value: boolean
}

export type TIPdiListList = {
    total: number,
    data: IPdiList[]
}

export type TIPdiListPayload = {
    checkpoints: checkPointsValue[],
    prospectId: number;
};

export type TListFiltersIPdiList = {
    offset: number;
    limit: number;
    search?: string;
    sorting?: any;
    trashOnly?: string;
    filters?: {
        id?: number;
        createdBy?: number;
        [key: string]: any;
    };
};