import { BaseMeta } from "apps/common/models/Base";

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




interface ICampaign extends BaseMeta {
    name: string;
    organizationId: number;
    regionId: number;
    description?: string;
    questionList: number[];
    affiliateId?: number
    proposalIds: number[];
    start: Date;
    to: Date;
}

type TCampaignList = {
    total: number,
    data: ICampaign[]
}

type TPayloadCampaign = {
    name: string;
    region?: string;
    organizationId: number;
    description?: string;
    questionList: number[];
    createdBy: number;
}

interface ICampaignSubmisisons {
    id: number;
    campaignId: number;
    response: string;
    createdAt: Date;
    updatedAt: Date;
}

interface ParsedCampaign {
    id: number;
    name: string;
    organizationId: number;
    regionId: number;
    description?: string;
    questionList: number[];
    affiliateId?: number
    proposalIds: number[];
    start: Date;
    to: Date;
}

type TPayloadCampaignSubmisisons = {
    campaignId: number;
    response: string;
}

type TCampaignSubmisisonsList = {
    total: number,
    data: ICampaignSubmisisons[]
}

export {
    ICampaign,
    TCampaignList,
    TPayloadCampaign,
    ICampaignSubmisisons,
    TCampaignSubmisisonsList,
    TPayloadCampaignSubmisisons,
    ParsedCampaign
}
