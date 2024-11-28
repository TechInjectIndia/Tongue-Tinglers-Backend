import {Address} from "./user";

interface Franchisee {
    pocName: string;
    pocEmail: string;
    pocPhoneNumber: string;
    users: Array<number>;
    regionId: number;
    area: string;
    agreementIds: Array<number>;
    paymentIds: Array<number>;
    status: FRANCHISE_STATUS;
    establishedDate: Date;
}

 interface  franchiseDetails{
     location: Address;
     sm: Array<SocialMediaDetails>;
 }

interface FranchiseeWithLocation extends Franchisee {
    pocName: string;
    pocEmail: string;
    pocPhoneNumber: string;
    users: Array<number>;
    regionId: number;
    area: string;
    agreementIds: Array<number>;
    paymentIds: Array<number>;
    status: FRANCHISE_STATUS;
    establishedDate: Date;
    location: number;
    sm: Array<SocialMediaDetails>;
}

enum FRANCHISE_STATUS {
    Active = "Active",
    Inactive = "Inactive",
    Pending = "Pending",
    Suspended = "Suspended",
    Terminated = "Terminated"
}

interface FranchiseLocation {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

interface SocialMediaDetails {
    id: number;
    affiliateId: number;
    platform: socialMediaEnumsPlatform;  // e.g., 'FB', 'INSTAGRAM', 'YOUTUBE'
    handle: string;
    followers: number;
    tags: string[];
}

enum socialMediaEnumsPlatform {
    FB = "fb",
    INSTAGRAM = "instagram",
    YOUTUBE = "youtube",
    TWITTER = "twitter",
    LINKEDIN = "linkedin",
    TIKTOK = "tiktok",
    SNAPCHAT = "snapchat",
    PINTEREST = "pinterest",
    REDDIT = "reddit",
    TUMBLR = "tumblr",
}

export {
    Franchisee,
    FRANCHISE_STATUS,
    FranchiseLocation,
    SocialMediaDetails,
    socialMediaEnumsPlatform
}


