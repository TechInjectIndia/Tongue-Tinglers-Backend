
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

export {
    ICampaign,
    Question
}