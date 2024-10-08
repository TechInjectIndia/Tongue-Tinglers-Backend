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

interface ILead extends UpdatedMetaData, BaseModel, DeletionMetaData {
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
    followDetails: Array<FollowDetails> | null;
    referBy: UserDetails | null;
    logs: Record<string, ITrackable[]>;
    notes: Note[] | null;
    proposalModals: Array<string> | null;
    franchiseModals: Array<FranchiseModels> | null;
    affiliate: Array<Affiliate> | null;
    marketing: Array<string> | null;
    other: Array<ExtraFields> | null;
}

interface FranchiseModels extends UpdatedMetaData, BaseModel, DeletionMetaData {
    id: string,
    description: string,
    title: string,
    reqArea: number,
    images: SeoImage[],
    investment: number,
    runningCost: number,
    bestFor: string[],
    inclusions: string[],
    others: ExtraFields
}

interface SeoImage {
    localFile: File | undefined;
    url: string;
    alt: string;
}

interface ExtraFields {
    key: string,
    value: string,
    title: string,
    type: extraFieldTypes
}

enum extraFieldTypes {
    STRING = "string",
    NUMBER = "number",
    DATE = "date"
}

interface Affiliate extends UpdatedMetaData, BaseModel, DeletionMetaData {
    id: string,
    type: Affiliate,
    codes: Record<string, string>
    sm: Record<string, SMDetails>
}

interface SMDetails {
    handle: string,
    followers: number,
    tags: string[]
}

interface LeadAddress {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    GSTIN: string | null;
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
    SMDetails
};
