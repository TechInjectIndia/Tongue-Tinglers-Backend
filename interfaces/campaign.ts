
import type { UpdatedMetaData, BaseModel, DeletionMetaData } from ".";

interface ICampaign extends UpdatedMetaData, BaseModel, DeletionMetaData {
    name: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    questions: Question[];
}

interface Question {
    id: string;
}

type TCampaignList = {
    total: number,
    data: ICampaign[]
}

type TPayloadCampaign = {
    name: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    questions: Question[];
    createdBy: string;
}

export {
    ICampaign,
    Question,
    TCampaignList,
    TPayloadCampaign
}