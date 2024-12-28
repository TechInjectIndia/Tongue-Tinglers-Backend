import { FollowDetails, ParsedFollowDetails } from "../../follow-details/interface/followDetails"
import { ParsedAffiliate } from "../../affiliate/interface/affiliate"
import { ParsedFranchiseModels } from "../../franchise_model/interface/franchiseModel";
import { ParsedProposal } from "../../proposal_model/interface/proposal";
import { ParsedUser } from "../../user/interface/User";

interface LeadAddress {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    PAN: string | null;
}

interface Note {
    note: string;
    userDetails: number;
    date: Date;
}

enum LeadSource {
    ADMIN = "admin",
    SEARCH = "search",
    CONTENT = "content",
    SOCIAL_MEDIA = "social-media",
    EMAIL_MARKETING = "email-marketing",
    PAID = "paid",
    EVENT = "event",
    REFERRAL = "referral",
    GOOGLE_SEARCH = "google search",
    INSTAGRAM = "instagram",
    FACEBOOK = "facebook",
    LINKEDIN = "linkedin",
    EMAIL = "email",
    PHYSICAL_EVENT = "physical event",
    ADVERTISEMENT = "advertisement",
    CALL = "call",
}

enum LeadStatus {
    NEW = "new",
    CONTACTED = "contacted",
    QUALIFIED = "qualified",
    PROPOSAL_SENT = "proposal-sent",
    NEGOTIATION = "negotiation",
    CONVERTED = "converted",
    LOST = "lost",
    FOLLOWED_UP = "followed-up",
}

interface ExtraFields {
    id: number,
    key: string,
    value: string,
    title: string,
    type: extraFieldTypes,
    franchiseModelId: number,
}

export interface LeadPayload {
    status: LeadStatus;
    source: LeadSource;
    sourceInfo: string | null;
    campaignId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: LeadAddress;
    additionalInfo: string | null;
    followDetails: FollowDetails[] | null;
    referBy: number | null;
    notes: Note[] | null;
    proposalModalId: number | null;
    amount: number | null;
    franchiseModals: number[] | null;
    affiliate: number[] | null;
    marketing: number[] | null;
    other: ExtraFields[] | null;
    assignedUser: number | null;
}

export interface ParseLead {
    id: number;
    status: LeadStatus;
    source: LeadSource;
    sourceInfo: string | null;
    campaignId: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: LeadAddress;
    additionalInfo: string | null;
    logs: [];
    followDetails: ParsedFollowDetails[] | null;
    referBy: ParsedUser | null;
    notes: Note[] | null;
    proposalModalId: ParsedProposal | null;
    amount: number | null;
    franchiseModals: ParsedFranchiseModels[] | null;
    affiliate: ParsedAffiliate[] | null;
    marketing: ParsedUser[] | null;
    other: ExtraFields[] | null;
    assignedUser: ParsedUser | null;
    createdAt: Date;
    createdBy: ParsedUser;
    updatedAt: Date | null;
    updatedBy: ParsedUser | null;
    deletedAt: Date | null;
    deletedBy: ParsedUser | null;
}


enum followStatus {
    FOLLOWED_UP = "followed-up",
    NOT_FOLLOWED_UP = "not-followed-up",
}

// enum LeadSource {
//     ADMIN = "admin",
//     SEARCH = "search",
//     CONTENT = "content",
//     SOCIAL_MEDIA = "social-media",
//     EMAIL_MARKETING = "email-marketing",
//     PAID = "paid",
//     EVENT = "event",
//     REFERRAL = "referral",
//     GOOGLE_SEARCH = "google search",
//     INSTAGRAM = "instagram",
//     FACEBOOK = "facebook",
//     LINKEDIN = "linkedin",
//     EMAIL = "email",
//     PHYSICAL_EVENT = "physical event",
//     ADVERTISEMENT = "advertisement",
//     CALL = "call",
// }

// enum LeadStatus {
//     NEW = "new",
//     CONTACTED = "contacted",
//     QUALIFIED = "qualified",
//     PROPOSAL_SENT = "proposal-sent",
//     NEGOTIATION = "negotiation",
//     CONVERTED = "converted",
//     LOST = "lost",
//     FOLLOWED_UP = "followed-up",
// }

interface AssignAttributes {
    assignedTo: number;
    assignedBy: number;
    assignedDate: Date;
}

// interface ILead extends UpdatedMetaData, BaseModel, DeletionMetaData {
//     assignedUser: number;
//     campaignId?: number;
//     status: LeadStatus;
//     firstName: string;
//     lastName: string;
//     phoneNumber: string;
//     email: string;
//     address: LeadAddress;
//     additionalInfo: string | null;
//     source: LeadSource;
//     sourceInfo: string | null;
//     followDetails?: FollowDetails[] | null;
//     referBy: UserDetails | null;
//     logs: Record<string, ITrackable[]>;
//     notes: Note[] | null;
//     proposalModalId?: number | null;
//     amount?: number | null;
//     franchiseModals: Array<FranchiseModels> | null;
//     affiliate: Array<Affiliate> | null;
//     marketing: Array<string> | null;
//     other: Array<ExtraFields> | null;
// }


// interface ParseLead extends ParsedMeta {
//     id: number;
//     assignedUser: MetaUser;
//     campaignId: ParsedCampaign,
//     status: LeadStatus;
//     firstName: string;
//     lastName: string;
//     phoneNumber: string;
//     email: string;
//     address: LeadAddress;
//     additionalInfo: string | null;
//     source: LeadSource;
//     sourceInfo: string | null;
//     followDetails?: [] | null;
//     referBy: UserDetails | null;
//     logs: Record<string, ITrackable[]>;
//     notes: Note[] | null;
//     proposalModalId?: number | null;
//     amount?: number | null;
//     franchiseModals: Array<FranchiseModels> | null;
//     affiliate: Array<Affiliate> | null;
//     marketing: Array<string> | null;
//     other: Array<ExtraFields> | null;
// }

interface ProposalModels {
    id: number,
    title: string,
    /* comma separated string */
    prices: string;
    franchiseModel: number;
    createdAt: Date;
    createdBy: number;
    updatedAt: Date | null;
    updatedBy: number | null;
    deletedAt: Date | null;
    deletedBy: number | null;
}

type TPayloadProposalModel = {
    title: string;
    /* comma separated string */
    prices: string;
    franchiseModel: number;
    createdBy: number;
}

type ProposalModelsList = {
    total: number;
    data: ProposalModels[];
};

interface FranchiseModels {
    id: number,
    description: string,
    title: string,
    reqArea: number,
    investment: number,
    runningCost: number,
    bestFor: string[],
    inclusions: string[],
}

type TPayloadFranchiseModel = {
    description: string,
    title: string,
    reqArea: number,
    investment: number,
    runningCost: number,
    bestFor: string[],
    inclusions: string[],
}

type FranchiseModelsList = {
    total: number;
    data: FranchiseModels[];
};

interface SeoImage {
    id: number,
    localFile: File | undefined;
    url: string;
    alt: string;
    franchiseModelId: number,
}

interface SeoImagePayload {
    localFile: File | undefined;
    url: string;
    alt: string;
}

interface ExtraFields {
    id: number,
    key: string,
    value: string,
    title: string,
    type: extraFieldTypes,
    franchiseModelId: number,
}

enum extraFieldTypes {
    STRING = "string",
    NUMBER = "number",
    DATE = "date"
}

enum socialMediaEnumsPlatform {
    FB = "fb",
    INSTAGRAM = "instagram",
    YOUTUBE = "youtube",
    TWITTER = "twitter",
    LINKEDIN = "linkedin",
    TIKTOK = "tiktok",
    SNAPCHAT = "snapchat",
    PINTEREST = "pinterest",
    REDDIT = "reddit",
    TUMBLR = "tumblr",
}

interface BaseSocialMedia {
    platform: socialMediaEnumsPlatform;  // e.g., 'FB', 'INSTAGRAM', 'YOUTUBE'
    handle: string;
    followers: number;
    tags: string[];
    affiliateId: number;
}

interface SocialMediaDetails extends BaseSocialMedia {
    id: number;
}


interface Affiliate {
    id: number,
    type: string,
    codes: Record<string, string>,
    userId: number
}

type AffiliatesList = {
    total: number;
    data: Affiliate[];
};

type TPayloadAffiliate = {
    type: string,
    codes: Record<string, string>
}

interface LeadAddress {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    PAN: string | null;
}

// interface FollowDetails {
//     followedDate: Date | null;
//     followedBy: UserDetails;
//     notes: string | null;
//     description: string | null;
//     status: followStatus;
//     createdAt: Date;
//     createdBy: UserDetails;
//     reminder: Date | null;
// }

interface parsedAffiliate {

}

// Export types
export {
    LeadStatus,
    LeadSource,
    FollowDetails,
    LeadAddress,
    followStatus,
    ExtraFields,
    Affiliate,
    FranchiseModels,
    SeoImage,
    SocialMediaDetails,
    AffiliatesList,
    TPayloadAffiliate,
    FranchiseModelsList,
    TPayloadFranchiseModel,
    ProposalModels,
    TPayloadProposalModel,
    ProposalModelsList,
    BaseSocialMedia,
    socialMediaEnumsPlatform,
    extraFieldTypes,
    SeoImagePayload,
    AssignAttributes,
    parsedAffiliate,
    Note

};
