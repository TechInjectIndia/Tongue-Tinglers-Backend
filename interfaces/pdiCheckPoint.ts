export interface ICheckPoint {
    title: string;
    id: number;
    createdBy: number | null;
    updatedBy: number | null;
    deletedBy: number | null;
}

export type TPdiCheckpointList = {
    total: number,
    data: ICheckPoint[]
}

export type TPdiCheckpointPayload = {
    title: string;
    createdBy: number | null ;
    updatedBy: number | null;
};

export type TListFiltersCheckpoint = {
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