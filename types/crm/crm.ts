//  ======= campaign Starts ==========
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

export type TCampaignsList = {
    total: number;
    data: TCampaign[];
};

export type TAddCampaign = {
    name: string;
    subject: string;
    body: string;
    status: string; // 'draft', 'sent', 'archived'
    scheduledAt: Date | null;
};

export type TAssignCampaign = {
    campaignId: number,
    subscriberId: number,
    status: string
};

export type TEditCampaign = {
    name: string;
    subject: string;
    body: string;
    status: string; // 'draft', 'sent', 'archived'
    scheduledAt: Date | null;
};
//  ======= campaign Ends ==========

//  ======= Inquiry Starts ==========
export type TInquiry = {
    id: number;
    email: string;
    subject: string;
    message: string;
    type: string; // Franchisee or Customer
    createdAt: Date;
    updatedAt: Date;
};

export type TInquirysList = {
    total: number;
    data: TInquiry[];
};

export type TAddInquiry = {
    email: string;
    subject: string;
    message: string;
    type: string; // Franchisee or Customer
};

export type TEditInquiry = {
    email: string;
    subject: string;
    message: string;
    type: string; // Franchisee or Customer
};
//  ======= Inquiry Ends ==========

//  ======= Subscriber Starts ==========
export type TSubscriber = {
    id: number;
    email: string;
    name: string;
    subscribedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
};

export type TSubscribersList = {
    total: number;
    data: TSubscriber[];
};

export type TAddSubscriber = {
    email: string;
    name: string;
    subscribedAt: Date | null;
};

export type TEditSubscriber = {
    email: string;
    name: string;
    subscribedAt: Date | null;
};
//  ======= Subscriber Ends ==========

//  ======= Email Starts ==========
export type TEmail = {
    id: number;
    campaignId: number;
    subscriberId: number;
    sentAt: Date | null;
    status: string; // 'delivered', 'failed'
    createdAt: Date;
    updatedAt: Date;
};

export type TEmailsList = {
    total: number;
    data: TEmail[];
};

export type TAddEmail = {
    campaignId: number;
    subscriberId: number;
    status: string; // 'delivered', 'failed'
};

export type TEditEmail = {
    campaignId: number;
    subscriberId: number;
    status: string; // 'delivered', 'failed'
};
//  ======= Email Ends ==========
