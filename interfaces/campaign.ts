
import type { UpdatedMetaData, BaseModel, DeletionMetaData } from ".";

interface ICampaign extends UpdatedMetaData, BaseModel, DeletionMetaData {
    name: string;
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

export {
    ICampaign,
    TCampaignList,
    TPayloadCampaign
}