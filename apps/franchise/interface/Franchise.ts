import { Address, BaseAddress } from "apps/address/interface/Address";
import { ParsedAffiliate } from "apps/affiliate/interface/Affiliate";
import { BaseMeta, BaseMetaUsers, ParsedMeta } from "apps/common/models/Base";
import { BaseSocialMedia, SocialMediaDetails } from "../../lead/interface/lead";
import { ParsedOrganization } from "../../organization/interface/organization";


import { ParsedRegion } from "apps/region/models/Region";
import {MetaUser, ParsedUser} from "apps/user/interface/user";


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
    assignedUser: number | null;
}

interface FranchiseDetails extends BaseMetaUsers, BaseFranchise {
    location: BaseAddress;
    sm: Array<BaseSocialMedia>;
}

interface Franchise extends BaseFranchise, BaseMeta {
    location: number;
    sm: Array<number>;
}

interface ParsedFranchise extends ParsedMeta {
    id: number;
    pocName: string;
    pocEmail: string;
    pocPhoneNumber: string;
    users: Array<ParsedUser>;
    region: ParsedRegion;
    area: string;
    agreementIds: Array<string>;
    paymentIds: Array<string>;
    organization: ParsedOrganization;
    status: FRANCHISE_STATUS;
    establishedDate: Date;
    affiliate: ParsedAffiliate|null;
    location: Address;
    sm: Array<SocialMediaDetails>;
    assignedUser: MetaUser | null
    logs: any[];
    documents?: any[];
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
    ParsedFranchise,
};
