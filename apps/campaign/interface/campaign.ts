interface CampaignPayload {
    name: string;
    organizationId: number;
    regionId: number;
    description?: string;
    questionList: string[];
    affiliateId?: number
    proposalIds: number[];
    start: Date;
    to: Date;
}

