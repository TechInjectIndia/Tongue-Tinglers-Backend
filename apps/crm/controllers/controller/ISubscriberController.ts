import { TQueryFilters, TAddSubscriber, TSubscribersList, TEditSubscriber } from '../../../../types';

/**
 * Interface for Subscriber Controller.
 */
interface ISubscriberController<T, F extends TQueryFilters> {
    /**
     * Get a subscriber by its ID.
     * @param id - The ID of the subscriber.
     * @returns Promise resolving to the subscriber or null if not found.
     */
    get(id: number): Promise<T | null>;

    /**
     * Create a new subscriber.
     * @param payload - The data to create the subscriber.
     * @returns Promise resolving to the created subscriber.
     */
    create(payload: TAddSubscriber): Promise<T>;

    /**
     * List subscribers with filters.
     * @param filters - Filtering options.
     * @returns Promise resolving to a list of subscribers.
     */
    list(filters: F): Promise<TSubscribersList>;

    /**
     * Update an existing subscriber.
     * @param id - The ID of the subscriber to update.
     * @param payload - The data to update the subscriber.
     * @returns Promise resolving to the affected count.
     */
    update(id: number, payload: TEditSubscriber): Promise<[affectedCount: number]>;
}

export default ISubscriberController;
