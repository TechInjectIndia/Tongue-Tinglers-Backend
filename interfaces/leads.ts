import type { UpdatedMetaData, BaseModel, DeletionMetaData, ITrackable, Note, UserDetails } from "../interfaces";

enum followStatus {
    FOLLOWED_UP = "followed-up",
    NOT_FOLLOWED_UP = "not-followed-up",
}

enum LeadSource {
    ADMIN = "admin",
    SEARCH = "search",
    CONTENT = "content",
    SOCIAL_MEDIA = "social-media",
    EMAIL_MARKETING = "email-marketing",
    PAID = "paid",
    EVENT = "event",
    REFERRAL = "referral"
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

interface AssignAttributes {
    id?: number;
    assignedTo: number;
    assignedBy: number;
    assignedDate: Date;
    leadId: number;
}

interface ILead extends UpdatedMetaData, BaseModel, DeletionMetaData {
    campaignId?: number;
    status: LeadStatus;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    address: LeadAddress;
    additionalInfo: string | null;
    source: LeadSource;
    sourceInfo: string | null;
    followDetails: Array<FollowDetails> | null;
    referBy: UserDetails | null;
    logs: Record<string, ITrackable[]>;
    notes: Note[] | null;
    proposalModalId?: number | null;
    amount?: number | null;
    franchiseModals: Array<FranchiseModels> | null;
    affiliate: Array<Affiliate> | null;
    marketing: Array<string> | null;
    other: Array<ExtraFields> | null;
}

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
    createdAt: Date;
    createdBy: number;
    updatedAt: Date | null;
    updatedBy: number | null;
    deletedAt: Date | null;
    deletedBy: number | null;
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

interface SocialMediaDetailsAttributes {
    id: number;
    affiliateId: number;
    platform: socialMediaEnumsPlatform;  // e.g., 'FB', 'INSTAGRAM', 'YOUTUBE'
    handle: string;
    followers: number;
    tags: string[];
}

interface SocialMediaDetailsAttributesPayload {
    affiliateId: number;
    platform: socialMediaEnumsPlatform;  // e.g., 'FB', 'INSTAGRAM', 'YOUTUBE'
    handle: string;
    followers: number;
    tags: string[];
}

interface Affiliate {
    id: number,
    type: string,
    codes: Record<string, string>
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

interface FollowDetails {
    followedDate: Date | null;
    followedBy: UserDetails;
    notes: string | null;
    description: string | null;
    status: followStatus;
    createdAt: Date;
    createdBy: UserDetails;
    reminder: Date | null;
}

// Export types
export {
    ILead,
    LeadStatus,
    LeadSource,
    FollowDetails,
    LeadAddress,
    followStatus,
    ExtraFields,
    Affiliate,
    FranchiseModels,
    SeoImage,
    SocialMediaDetailsAttributes,
    AffiliatesList,
    TPayloadAffiliate,
    FranchiseModelsList,
    TPayloadFranchiseModel,
    ProposalModels,
    TPayloadProposalModel,
    ProposalModelsList,
    SocialMediaDetailsAttributesPayload,
    socialMediaEnumsPlatform,
    extraFieldTypes,
    SeoImagePayload,
    AssignAttributes
};
