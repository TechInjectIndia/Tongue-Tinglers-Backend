import { TQueryFilters, TAddCampaign, TCampaign, TCampaignsList, TEditCampaign } from '../../../../types'

interface ICampaignController<T, F extends TQueryFilters> {
    getAllSubscribersByCampaignId(campaignId: number): Promise<TCampaign[] | null>
    get(id: number): Promise<T | null>;
    create(payload: TAddCampaign): Promise<T>;
    list(filters: F): Promise<TCampaignsList>;
    update(id: number, payload: TEditCampaign): Promise<[affectedCount: number]>;
}

export default ICampaignController;
