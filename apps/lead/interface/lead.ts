import { ParsedAffiliate } from "apps/affiliate/interface/affiliate";
import { BaseMeta } from "apps/common/models/Base";
import { FollowDetails, ParsedFollowDetails } from "apps/follow-details/interface/followDetails";
import { ParsedFranchiseModels } from "apps/franchise_model/interface/franchiseModel";
import { ParsedProposal } from "apps/proposal_model/interface/proposal";
import { MetaUser } from "apps/user/interface/user";


interface AssignAttributes {
    assignedTo: number;
    assignedBy: number;
    assignedDate: Date;
}


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

interface ITrackable {
    userDetails: number;
    events: string;
    timeline: Date;
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


enum socialMediaEnumsPlatform {
    FACEBOOK = "facebook",
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

enum extraFieldTypes {
    STRING = "string",
    NUMBER = "number",
    DATE = "date"
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
    followDetails?: FollowDetails[] | null;
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

export interface LeadTable extends LeadPayload, BaseMeta { }

export interface ParsedLead {
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
    followDetails: ParsedFollowDetails[] | null;
    referBy: MetaUser | null;
    notes: Note[] | null;
    proposalModalId: ParsedProposal | null;
    amount: number | null;
    franchiseModals: ParsedFranchiseModels[] | null;
    affiliate: ParsedAffiliate[] | null;
    marketing: MetaUser[] | null;
    other: ExtraFields[] | null;
    assignedUser: MetaUser | null;
    createdAt: Date;
    createdBy: MetaUser;
    updatedAt: Date | null;
    updatedBy: MetaUser | null;
    deletedAt: Date | null;
    deletedBy: MetaUser | null;
    logs: any[] | null;
}

export type TLeadsList = {
    total: number;
    data: ParsedLead[];
  };

export interface TLeadFilters {
offset: number;
limit: number;
search: string;
sorting: any;
userRole?: string;
userFranchiseeId?: string;
franchiseId?: string;
franchiseData?: any;
dateRange: {
    start: Date;
    end: Date;
};
}

export { Note,AssignAttributes, LeadStatus, LeadSource, BaseSocialMedia, ITrackable, LeadAddress, SocialMediaDetails, ExtraFields, extraFieldTypes, socialMediaEnumsPlatform }
