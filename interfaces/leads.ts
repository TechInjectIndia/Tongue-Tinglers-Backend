export enum LEAD_SOURCE {
    ADMIN = "admin",
    WEBSITE = "website",
    OTHERS = "others",
}

export interface FOLLOWED_DATE {
    date: Date,
    by: string,
    isFollowedUp: boolean
}

export enum LEAD_STATUS {
    NEW = "new",
    CONTACTED = "contacted",
    QUALIFIED = "qualified",
    PRUPOSAL_SENT = "pruposal-sent",
    NEGOTIATION = "negotiation",
    CONVERTED = "converted",
    LOST = "lost",
    FOLLOWED_UP = "followed-up",
}

export interface Assignee {
    assignedTo: string;
    assignedBy: string;
    assignedDate: Date;
}