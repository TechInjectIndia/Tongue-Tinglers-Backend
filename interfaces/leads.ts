export interface BaseModel {
    id: string;
    createdBy: string;
    createdAt: Date;
}

export interface UpdatedMetaData {
    updatedBy: string | null;
    updatedAt: Date | null;
}

export interface DeletionMetaData {
    deletedBy: string | null;
    deletedAt: Date | null;
}

interface ILead extends UpdatedMetaData, BaseModel, DeletionMetaData {
    assign: Assignee;
    status: LeadStatus;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    address: LeadAddress;
    additionalInfo: string;
    source: LeadSource;
    sourceInfo: string | null;
    followDetails: Array<FollowDetails> | null;
    referBy: UserDetails;
    logs: Record<string, ITrackable[]>;
    notes: Note[] | null;
}

interface LeadAddress {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    GSTIN: string | null;
}

interface Note {
    note: string;
    userDetails: UserDetails;
    date: Date;
}

interface ITrackable {
    userDetails: UserDetails;
    events: string;
    timeline: Date;
}

enum followStatus {
    FOLLOWED_UP = "followed-up",
    NOT_FOLLOWED_UP = "not-followed-up",
}

enum LeadSource {
    ADMIN = "admin",
    WEBSITE = "website",
    OTHERS = "others",
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

interface Assignee {
    assignedTo: UserDetails;
    assignedBy: UserDetails;
    assignedDate: Date;
}

interface UserDetails {
    userName: string;
    id: string;
}

interface FollowDetails {
    followedDate: Date | null;
    followedBy: UserDetails;
    notes: string | null;
    description: string | null;
    status: followStatus;
    createdAt: Date;
    createdBy: UserDetails;
}

// Export types
export { ILead, LeadStatus, LeadSource, Assignee, FollowDetails, UserDetails, LeadAddress, ITrackable, Note, followStatus };
