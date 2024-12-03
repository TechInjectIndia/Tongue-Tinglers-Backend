import {
    BaseSocialMedia, SocialMediaDetails,
} from "../../../../interfaces";


interface ISocialMediaDetailsRepo<T> {

    get(id: number): Promise<T | null>;

    update(id: number, data: Partial<T>): Promise<T | null>;

    create(data: BaseSocialMedia): Promise<T>;

    getByAffiliateAndPlatform(Id: number, platform: string): Promise<T | null>;

    saveBulk(data: BaseSocialMedia[]): Promise<SocialMediaDetails[]>;
}

export default ISocialMediaDetailsRepo;
