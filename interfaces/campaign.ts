
import type { UpdatedMetaData, BaseModelIdNumber, DeletionMetaData } from ".";

interface ICampaign extends UpdatedMetaData, BaseModelIdNumber, DeletionMetaData {
    name: string;
    franchiseId?: string;
    regionId: number;
    description?: string;
    questionList: string[];
    affiliateId: string
    proposalIds: string[];
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
    franchiseId?: string;
    description?: string;
    questionList: string[];
    createdBy: string;
}

interface ICampaignSubmisisons {
    id: string;
    campaignId: number;
    response: string;
    createdAt: Date;
    updatedAt: Date;
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
    TPayloadCampaignSubmisisons
}