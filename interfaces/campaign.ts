
import type { UpdatedMetaData, BaseModelIdNumber, DeletionMetaData } from ".";

interface ICampaign extends UpdatedMetaData, BaseModelIdNumber, DeletionMetaData {
    name: string;
    description: string;
    proposalIds: string[];
    affiliateId: string | null;
    franchiseId: string | null;
    questionIds: string[];
    regionId: string;
}

type TCampaignList = {
    total: number,
    data: ICampaign[]
}

type TPayloadCampaign = {
    name: string;
    description: string;
    proposalIds: string[];
    affiliateId: string | null;
    franchiseId: string | null;
    questionIds: string[];
    regionId: string;
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