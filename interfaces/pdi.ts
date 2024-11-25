export interface ICheckList {
    id:number,
    checkpoints: checkPointsValue[]
    franchiseModelId: number;
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

export type TICheckListList = {
    total: number,
    data: ICheckList[]
}

export type TICheckListPayload = {
    checkpoints: checkPointsValue[],
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
        createdBy?: number;
        [key: string]: any;
    };
};