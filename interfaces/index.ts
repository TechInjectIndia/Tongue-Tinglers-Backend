export * from './user';
export * from './leads';
export * from './menu';
export * from './testimonials';
export * from './reviews';
export * from './products';
export * from './product_category';
export * from './orders';
export * from './crm';
export * from './petpooja';
export * from './contracts';
export * from './form-question';
export * from './campaign';
export * from './file';
export * from './gallery';
export * from './franchisee';
export * from './pdiChecklist';
export * from './taxes';
export * from './stocks';
export * from './regions';
export * from './vendor';
export * from './cart';
export * from './userAddress';

interface ITrackable {
    userDetails: UserDetails;
    events: string;
    timeline: Date;
}

interface Note {
    note: string;
    userDetails: UserDetails;
    date: Date;
}

interface UserDetails {
    userName: string;
    id: string;
}

interface BaseModel {
    id: string;
    createdBy: string;
    createdAt: Date;
}

interface BaseModelIdNumber {
    id: number;
    createdBy: string;
    createdAt: Date;
}

interface UpdatedMetaData {
    updatedBy: string | null;
    updatedAt: Date | null;
}

interface DeletionMetaData {
    deletedBy: string | null;
    deletedAt: Date | null;
}

export {
    ITrackable,
    Note,
    UserDetails,
    BaseModel,
    UpdatedMetaData,
    DeletionMetaData,
    BaseModelIdNumber
};
