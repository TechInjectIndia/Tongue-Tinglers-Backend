import { SocialMediaDetails, SocialMediaDetailsAttributesPayload } from "../../../../interfaces";

/**
 * Interface for Social Media Details Repository.
 */
interface ISocialMediaDetailsRepo<T> {
    /**
     * Fetches a social media detail by its ID.
     * @param id - The ID of the social media detail.
     * @returns A promise resolving to the social media detail or null if not found.
     */
    get(id: number): Promise<T | null>;

    /**
     * Updates an existing social media detail by ID.
     * @param id - The ID of the social media detail to update.
     * @param data - The new data for the social media detail.
     * @returns A promise resolving to the updated social media detail or null if not found.
     */
    update(id: number, data: Partial<T>): Promise<T | null>;

    /**
     * Creates a new social media detail.
     * @param data - The data for the new social media detail.
     * @returns A promise resolving to the created social media detail.
     */
    create(data: SocialMediaDetailsAttributesPayload): Promise<T>;

    /**
     * Fetches a social media detail by affiliate ID and platform.
     * @param affiliateId - The ID of the affiliate.
     * @param platform - The platform identifier.
     * @returns A promise resolving to the social media detail or null if not found.
     */
    getByAffiliateAndPlatform(affiliateId: number, platform: string): Promise<T | null>;
}

export default ISocialMediaDetailsRepo;
