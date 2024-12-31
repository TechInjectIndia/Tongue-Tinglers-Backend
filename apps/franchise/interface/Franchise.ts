import { Address, BaseAddress } from "apps/address/interface/Address";
import { ParsedAffiliate } from "apps/affiliate/interface/affiliate";
import { BaseMeta, BaseMetaUsers, ParsedMeta } from "apps/common/models/Base";
import { BaseSocialMedia, SocialMediaDetails } from "../../lead/interface/lead";
import { ParsedOrganization } from "../../organization/interface/organization";


import { parsedRegion } from "apps/region/models/Region";
import { ParsedUser } from "apps/user/interface/user";


interface BaseFranchise {
    pocName: string;
    pocEmail: string;
    pocPhoneNumber: string;
    users: Array<number>;
    regionId: number;
    area: string;
    agreementIds: Array<string>;
    paymentIds: Array<string>;
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

interface parsedFranchise extends ParsedMeta {
    id: number;
    pocName: string;
    pocEmail: string;
    pocPhoneNumber: string;
    users: Array<ParsedUser>;
    region: parsedRegion;
    area: string;
    agreementIds: Array<string>;
    paymentIds: Array<string>;
    organization: ParsedOrganization;
    status: FRANCHISE_STATUS;
    establishedDate: Date;
    affiliate: ParsedAffiliate;
    location: Address;
    sm: Array<SocialMediaDetails>;
}

enum FRANCHISE_STATUS {
    Active = "Active",
    Inactive = "Inactive",
    Pending = "Pending",
    Suspended = "Suspended",
    Terminated = "Terminated",
}

export {
    BaseFranchise,
    FRANCHISE_STATUS,
    FranchiseDetails,
    Franchise,
    parsedFranchise,
};
