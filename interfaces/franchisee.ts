interface FranchiseLocationAttributes {
    id: number;
    franchiseeId: number;
    contactPhone: string;
    location: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    createdAt: Date;
    updatedAt: Date | null;
}

interface AddFranchiseLocationPayload {
    contactPhone: string;
    location: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    franchiseeId: number;
}

export default AddFranchiseLocationPayload;

interface SocialMediaDetailsAttributesFranchisee {
    id: number;
    franchiseeId: number;
    url: string;
    type: SM_PLATFORM_FRANCHISE
}

interface AddSocialMediaDetailsAttributesFranchisee {
    franchiseeId: number;
    url: string;
    type: SM_PLATFORM_FRANCHISE
}

enum SM_PLATFORM_FRANCHISE {
    FB = "fb",
    INSTAGRAM = "instagram",
    YOUTUBE = "youtube"
}

enum FranchiseType {
    MASTER_FRANCHISE = "master_franchise",
    SUPER_FRANCHISE = "super_franchise",
    FRANCHISE = "franchise",
}

interface FranchiseeRenewalInfo {
    renewalDate: Date;
    conditions: string;
}

interface TrainingHistory {
    date: Date;
    topic: string;
}

interface FranchiseeAttributes {
    id: number;
    userid: number | null;
    referBy?: number | null;
    parentFranchise?: string | null;
    name: string;
    ownerName: string;
    contactEmail: string;
    contactNumber: string | null;
    establishedDate: Date | null;
    franchiseAgreementSignedDate: Date | null;
    franchiseType: FranchiseType;
    regionId: number | null;
    contractIds: number[];
    activeContract: string;
    isActive: boolean | null;
    ratings?: number | null;
    franchiseRenewalInfo?: FranchiseeRenewalInfo | null;
    franchiseLocation?: FranchiseLocationAttributes[];
    organizationId: number;
}

interface AddFranchiseePayload {
    userid: number | null;
    referBy?: number | null;
    parentFranchise?: string | null;
    name: string;
    ownerName: string;
    contactEmail: string;
    contactNumber: string | null;
    establishedDate: Date | null;
    franchiseAgreementSignedDate: Date | null;
    franchiseType: FranchiseType;
    regionId: number | null;
    socialMediaLinks?: { url: string, type: SM_PLATFORM_FRANCHISE }[];
    contractIds: number[];
    activeContract: string;
    isActive: boolean | null;
    ratings?: number | null;
    franchiseRenewalInfo?: FranchiseeRenewalInfo | null;
    franchiseLocation?: FranchiseLocationAttributes[];
}

export {
    FranchiseeAttributes,
    AddFranchiseePayload,
    FranchiseLocationAttributes,
    FranchiseeRenewalInfo,
    TrainingHistory,
    FranchiseType,
    SM_PLATFORM_FRANCHISE,
    SocialMediaDetailsAttributesFranchisee,
    AddFranchiseLocationPayload,
    AddSocialMediaDetailsAttributesFranchisee
};
