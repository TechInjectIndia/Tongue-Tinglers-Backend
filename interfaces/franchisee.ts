interface FranchiseLocationAttributes {
    id: string;
    franchiseeId: string;
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
    franchiseeId: string;
}

export default AddFranchiseLocationPayload;

interface SocialMediaDetailsAttributesFranchisee {
    id: string;
    franchiseeId: string;
    url: string;
    type: SM_PLATFORM_FRANCHISE
}

interface AddSocialMediaDetailsAttributesFranchisee {
    franchiseeId: string;
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
    id: string;
    userid: string | null;
    referBy?: string | null;
    parentFranchise?: string | null;
    name: string;
    ownerName: string;
    contactEmail: string;
    contactNumber: string | null;
    establishedDate: Date | null;
    franchiseAgreementSignedDate: Date | null;
    franchiseType: FranchiseType;
    regionId: string | null;
    contractIds: string[];
    activeContract: string;
    isActive: boolean | null;
    ratings?: number | null;
    franchiseRenewalInfo?: FranchiseeRenewalInfo | null;
    franchiseLocation?: FranchiseLocationAttributes[];
    organizationId: string;
}

interface AddFranchiseePayload {
    userid: string | null;
    referBy?: string | null;
    parentFranchise?: string | null;
    name: string;
    ownerName: string;
    contactEmail: string;
    contactNumber: string | null;
    establishedDate: Date | null;
    franchiseAgreementSignedDate: Date | null;
    franchiseType: FranchiseType;
    regionId: string | null;
    socialMediaLinks?: { url: string, type: SM_PLATFORM_FRANCHISE }[];
    contractIds: string[];
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
