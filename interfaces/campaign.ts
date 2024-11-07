
import type { UpdatedMetaData, BaseModelIdNumber, DeletionMetaData } from ".";

interface ICampaign extends UpdatedMetaData, BaseModelIdNumber, DeletionMetaData {
    name: string;
    franchiseId?: string;
    region?: string;
    description?: string;
    questionList: string[];
}

type TCampaignList = {
    total: number,
    data: ICampaign[]
}

type TPayloadCampaign = {
    name: string;
    description?: string;
    questionList: string[];
    createdBy: string;
}

interface ICampaignSubmisisons {
    id: string;
    campaignId: string;
    response: string;
    createdAt: Date;
    updatedAt: Date;
}

type TPayloadCampaignSubmisisons = {
    campaignId: string;
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