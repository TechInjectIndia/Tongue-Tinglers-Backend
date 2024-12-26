import {FollowDetails, ParsedFollowDetails} from "../../follow-details/interface/followDetails"
import {Affiliate, ParsedAffiliate} from "../../affiliate/interface/affiliate"
import { FranchiseModelsPayload, ParsedFranchiseModels } from "../../franchise_model/interface/franchiseModel";
import { ParsedProposal } from "../../proposal_model/interface/proposal";
import { ParsedUser } from "../../user/interface/user";

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
