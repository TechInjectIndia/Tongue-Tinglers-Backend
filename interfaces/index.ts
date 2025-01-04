export * from "./user";
export * from "./leads";
export * from "./menu";
export * from "./testimonials";
export * from "./reviews";
export * from "./franchise";

export * from "./product_category";
// export * from "./orders";
export * from "./crm";
export * from "./petpooja";
export * from "./form-question";
export * from "./campaign";
export * from "./file";
export * from "./gallery";
export * from "./pdiChecklist";
export * from "./taxes";
export * from "./stocks";
export * from "./regions";
export * from "./area";
export * from "./vendor";
export * from "./cart";
export * from "./userAddress";
export * from "./shippingActivity";

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
    id: number;
}

interface BaseModel {
    id: number;
    createdBy: number;
    createdAt: Date;
}

interface BaseModelIdNumber {
    id: number;
    createdBy: number;
    createdAt: Date;
}

interface UpdatedMetaData {
    updatedBy: number | null;
    updatedAt: Date | null;
}

interface DeletionMetaData {
    deletedBy: number | null;
    deletedAt: Date | null;
}

/* may be handled separately */
interface PaginatedBaseResponse<T> {
    totalData: number;
    currentPage: number;
    totalPages: number;
    data: T[];
}


export {
    ITrackable,
    Note,
    UserDetails,
    BaseModel,
    UpdatedMetaData,
    DeletionMetaData,
    BaseModelIdNumber,
    PaginatedBaseResponse,
};
