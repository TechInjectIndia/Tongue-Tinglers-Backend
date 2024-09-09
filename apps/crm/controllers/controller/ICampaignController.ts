import { TQueryFilters, TAddCampaign, TCampaignsList, TEditCampaign } from '../../../../types'

interface ICampaignController<T, F extends TQueryFilters> {
    get(id: number): Promise<T | null>;
    create(payload: TAddCampaign): Promise<T>;
    list(filters: F): Promise<TCampaignsList>;
    update(id: number, payload: TEditCampaign): Promise<[affectedCount: number]>;
}

export default ICampaignController;
