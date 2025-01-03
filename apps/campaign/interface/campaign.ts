import {BaseMeta} from "../../common/models/Base";

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
    proposalIds: number[];
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

export {
    ICampaign,
    TCampaignList,
    TPayloadCampaign,
    ICampaignSubmisisons,
    ParsedCampaign
}
