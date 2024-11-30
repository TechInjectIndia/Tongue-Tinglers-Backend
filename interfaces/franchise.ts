import { BaseAddress } from "../types";
import { BaseMeta } from "../database/schema/base/Base";
import { SocialMediaDetails } from "./leads";


interface BaseFranchise {
    pocName: string;
    pocEmail: string;
    pocPhoneNumber: string;
    users: Array<number>;
    regionId: number;
    area: string;
    agreementIds: Array<number>;
    paymentIds: Array<number>;
    status: FRANCHISE_STATUS;
    establishedDate: Date;
    organizationId: number;
}

interface FranchiseDetails extends BaseMeta, BaseFranchise {
    location: BaseAddress;
    sm: Array<SocialMediaDetails>;
}

interface Franchise extends BaseFranchise, BaseMeta {
    location: number;
    sm: Array<number>;
}

enum FRANCHISE_STATUS {
    Active = "Active",
    Inactive = "Inactive",
    Pending = "Pending",
    Suspended = "Suspended",
    Terminated = "Terminated"
}


export {
    BaseFranchise,
    FRANCHISE_STATUS,
    FranchiseDetails,
    Franchise,
};


