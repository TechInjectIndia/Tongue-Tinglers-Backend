interface FranchiseeLocation {
    contactPhone: string;
    location: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
}

enum FranchiseType {
    MASTER = "master",
    SINGLE = 'single',
    MULTI = 'multi'
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
    userid?: string;
    referBy?: string;
    name: string;
    ownerName: string;
    contactEmail: string;
    contactNumber?: string;
    franchiseLocations?: FranchiseeLocation[];
    establishedDate: Date;
    franchiseAgreementSignedDate: Date;
    franchiseType: FranchiseType;
    region: string;
    description?: string;
    website?: string;
    socialMediaLinks?: string[];
    logo?: string;
    numberOfEmployees: number;
    investmentAmount: number;
    royaltyPercentage: number;
    monthlyRevenue: number;
    numberOfOutlets: number;
    menuSpecialty?: string;
    businessHours?: string;
    deliveryOptions?: boolean;
    isActive: boolean;
    ratings?: number;
    promotions?: string[];
    targetMarket?: string;
    sustainabilityPractices?: string;
    trainingPrograms?: string[];
    supportContact?: string;
    operationalChallenges?: string[];
    competitiveAdvantages?: string;
    expansionPlans?: string;
    customerFeedback?: string[];
    industryCertifications?: string[];
    affiliatePrograms?: string[];
    performanceMetrics?: { [key: string]: number };
    franchiseRenewalInfo?: FranchiseeRenewalInfo;
    partnerships?: string[];
    marketingStrategies?: string[];
    trainingHistory?: TrainingHistory[];
    crisisManagementPlans?: string;
    diversityInitiatives?: string;
}

export {
    FranchiseeAttributes,
    FranchiseeLocation,
    FranchiseeRenewalInfo,
    TrainingHistory,
    FranchiseType
};
