import { TQueryFilters } from "../../../../types/admin";
import { TAddCampaign, TCampaign, TCampaignsList, TEditCampaign } from "../../../../types/crm/crm";


/**
 * Interface for Campaign Controller.
 */
interface ICampaignController<T, F extends TQueryFilters> {
    /**
     * Get all subscribers for a specific campaign by its ID.
     * @param campaignId - The ID of the campaign.
     * @returns Promise resolving to an array of subscribers or null if not found.
     */
    getAllSubscribersByCampaignId(campaignId: number): Promise<TCampaign[] | null>;

    /**
     * Get a campaign by ID.
     * @param id - The ID of the campaign.
     * @returns Promise resolving to the campaign or null if not found.
     */
    get(id: number): Promise<T | null>;

    /**
     * Create a new campaign.
     * @param payload - The data to create the campaign.
     * @returns Promise resolving to the created campaign.
     */
    create(payload: TAddCampaign): Promise<T>;

    /**
     * List campaigns with filters.
     * @param filters - Filtering options.
     * @returns Promise resolving to a list of campaigns.
     */
    list(filters: F): Promise<TCampaignsList>;

    /**
     * Update an existing campaign by ID.
     * @param id - The ID of the campaign to update.
     * @param payload - The data to update the campaign.
     * @returns Promise resolving to the affected count.
     */
    update(id: number, payload: TEditCampaign): Promise<[affectedCount: number]>;
}

export default ICampaignController;
