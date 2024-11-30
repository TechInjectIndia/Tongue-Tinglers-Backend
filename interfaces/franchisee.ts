import { BaseAddress } from "../types";
import { BaseMeta } from "../database/schema/base/Base";
import { SocialMediaDetails } from "./leads";


interface BaseFranchisee {
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

interface FranchiseDetails extends BaseMeta, BaseFranchisee {
    location: BaseAddress;
    sm: Array<SocialMediaDetails>;
}

interface Franchisee extends BaseFranchisee, BaseMeta {
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
    BaseFranchisee,
    FRANCHISE_STATUS,
    FranchiseDetails,
    Franchisee,
};


