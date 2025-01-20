import {BaseMeta} from "../../common/models/Base";
import {ParsedOrganization} from "../../organization/interface/organization";
import {ParsedRegion} from "../../region/models/Region";

import {IQuestion} from "../../questions/interface/Question";
import {ParsedProposal} from "../../proposal_model/interface/proposal";

interface ICampaign extends BaseMeta, CampaignPayload {

}

type TCampaignList = {
    total: number,
    data: ParsedCampaign[]
}

interface ICampaignSubmissions {
    id: number;
    campaignId: number;
    response: string;
    createdAt: Date;
    updatedAt: Date;
}

type TPayloadCampaignSubmissions = {
    campaignId: number;
    response: string;
}

type TCampaignSubmissionsList = {
    total: number,
    data: ICampaignSubmissions[]
}



export interface CampaignPayload {
    name: string;
    description?: string;
    questionList?: number[]; // Array of question IDs
    organizationId: number;
    regionId: number;
    start: Date;
    to: Date;
    proposalIds: number[];
    affiliateId?: number | null;
}

interface ParsedCampaign extends CampaignPayload {
    id: number;
    questions: IQuestion[];
    proposals: ParsedProposal[];
    region: ParsedRegion;
    organization:ParsedOrganization;
    
}

export {
    ICampaign,
    TCampaignList,
    ICampaignSubmissions,
    ParsedCampaign,
    TPayloadCampaignSubmissions,
    TCampaignSubmissionsList
}
