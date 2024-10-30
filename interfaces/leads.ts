import type {
    UpdatedMetaData,
    BaseModel,
    DeletionMetaData,
    ITrackable,
    Note,
    UserDetails,
} from "../interfaces";

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
    REFERRAL = "referral",
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

interface ILead extends UpdatedMetaData, BaseModel, DeletionMetaData {
    campaignId?: string;
    assign: Assignee | null;
    status: LeadStatus;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    address: LeadAddress;
    additionalInfo: string | null;
    source: LeadSource;
    sourceInfo: string | null;
    followDetails: Array<FollowDetails> | null; // it should be in different table
    referBy: UserDetails | null; // it should be in different table
    logs: Record<string, ITrackable[]>; // it should be in different table
    notes: Note[] | null; // it should be in different table
    proposalModals: Array<ProposalModels> | null;  // it should be in different table
    franchiseModals: Array<FranchiseModels> | null;  // it should be in different table
    affiliate: Array<Affiliate> | null;  // it should be in different table
    marketing: Array<string> | null;
    other: Array<ExtraFields> | null;  // it should be in different table
}

interface ProposalModels {
    id: string;
    title: string;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date | null;
    updatedBy: string | null;
    deletedAt: Date | null;
    deletedBy: string | null;
    budget: number;
    files: Array<SeoImage>;  // it should be in different table
}

type TPayloadProposalModel = {
    title: string;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date | null;
    updatedBy: string | null;
    deletedAt: Date | null;
    deletedBy: string | null;
    budget: number;
    files: Array<SeoImage>;  // it should be in different table
};

type ProposalModelsList = {
    total: number;
    data: ProposalModels[];
};

interface FranchiseModels {
    id: string;
    description: string;
    title: string;
    reqArea: number;
    images: SeoImage[];  // it should be in different table
    investment: number;
    runningCost: number;
    bestFor: string[];
    inclusions: string[];
    others: ExtraFields;   // it should be in different table and it should be array
}

type TPayloadFranchiseModel = {
    description: string;
    title: string;
    reqArea: number;
    images: SeoImage[];
    investment: number;
    runningCost: number;
    bestFor: string[];
    inclusions: string[];
    others: ExtraFields;   // it should be in different table and it should be array
};

type FranchiseModelsList = {
    total: number;
    data: FranchiseModels[];
};

interface SeoImage {
    localFile: File | undefined;
    url: string;
    alt: string;
}

interface ExtraFields {
    key: string;
    value: string;
    title: string;
    type: extraFieldTypes;
}

enum extraFieldTypes {
    STRING = "string",
    NUMBER = "number",
    DATE = "date",
}

interface Affiliate {
    id: string;
    type: string;
    codes: Record<string, string>;  // it should be in different table 
    sm: Record<string, SMDetails>;  // it should be in different table 
}

type AffiliatesList = {
    total: number;
    data: Affiliate[];
};

type TPayloadAffiliate = {
    type: string;
    codes: Record<string, string>; // it should be in different table 
    sm: Record<string, SMDetails>; // it should be in different table 
};

interface SMDetails {
    handle: string;
    followers: number;
    tags: string[];
}

interface LeadAddress {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    PAN: string | null;
}

interface Assignee {
    assignedTo: UserDetails;
    assignedBy: UserDetails;
    assignedDate: Date;
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
    Assignee,
    FollowDetails,
    LeadAddress,
    followStatus,
    ExtraFields,
    Affiliate,
    FranchiseModels,
    SeoImage,
    SMDetails,
    AffiliatesList,
    TPayloadAffiliate,
    FranchiseModelsList,
    TPayloadFranchiseModel,
    ProposalModels,
    TPayloadProposalModel,
    ProposalModelsList,
};
