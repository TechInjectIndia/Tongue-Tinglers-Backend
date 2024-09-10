import { TQueryFilters, TEmail, TAddEmail, TEmailsList, TEditEmail, TAssignCampaign } from '../../../../types'

interface IEmailController<T, F extends TQueryFilters> {
    campaignAssignment(campaignId: number, subscriberId: number, status: string): Promise<TAssignCampaign | null>
    get(id: number): Promise<T | null>;
    create(payload: TAddEmail): Promise<T>;
    list(filters: F): Promise<TEmailsList>;
    update(id: number, campaignId: number, subscriberId: number, payload: TEditEmail): Promise<[affectedCount: number]>;
}

export default IEmailController;
