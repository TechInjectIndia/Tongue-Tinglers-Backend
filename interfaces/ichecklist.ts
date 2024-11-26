export interface ICheckList {
    id:number,
    title:string,
    checkPoints: checkPointsValue[]
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
    data: ICheckList[]
}

export type TICheckListPayload = {
    title:string,
    checkPoints: checkPointsValue[],
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