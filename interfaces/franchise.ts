import { Address, BaseAddress } from "../types";
import { BaseMeta, BaseMetaUsers } from "../database/schema/base/Base";
import { BaseSocialMedia, parsedAffiliate, SocialMediaDetails } from "./leads";
import { parsedRegion, ParsedUser } from ".";
import { ParsedOrganization } from "./organization";


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
    affiliateId: number | null;
}

interface FranchiseDetails extends BaseMetaUsers, BaseFranchise {
    location: BaseAddress;
    sm: Array<BaseSocialMedia>;
}

interface Franchise extends BaseFranchise, BaseMeta {
    location: number;
    sm: Array<number>;
}

interface parsedFranchise {
    id: number;
    pocName: string;
    pocEmail: string;
    pocPhoneNumber: string;
    users: Array<ParsedUser>;
    region: parsedRegion;
    area: string;
    agreementIds: Array<number>;
    paymentIds: Array<number>;
    organization: ParsedOrganization;
    status: FRANCHISE_STATUS;
    establishedDate: Date;
    affiliate: parsedAffiliate,
    location: Address;
    sm: Array<SocialMediaDetails>;
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
    parsedFranchise
};


