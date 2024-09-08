export type TInquiry = {
    id: number;
    email: string;
    subject: string;
    message: string;
    type: string; // Franchisee or Customer
    createdAt: Date;
    updatedAt: Date;
};

export enum INQUIRY_TYPE {
    CUSTOMER = "customer",
    FRANCHISE = "franchise",
}

export enum CAMPAIGN_STATUS {
    DRAFT = "draft",
    SENT = "sent",
    ARCHIVED = "archived",
}

export enum EMAIL_STATUS {
    DELIVERED = "delivered",
    FAILED = "failed"
}

export type TCampaign = {
    id: number;
    name: string;
    subject: string;
    body: string;
    status: string; // 'draft', 'sent', 'archived'
    scheduledAt: Date | null;
    sentAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
};

export type TSubscriber = {
    id: number;
    email: string;
    name: string;
    subscribedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
};

export type TEmail = {
    id: number;
    campaignId: number;
    subscriberId: number;
    sentAt: Date | null;
    status: string; // 'delivered', 'failed'
    createdAt: Date;
    updatedAt: Date;
};
