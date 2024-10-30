interface FranchiseeLocation {
    contactPhone: string;
    location: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
}

enum FranchiseType {
    SUPER_FRANCHISE = "super_franchise",
    MASTER_FRANCHISE = "master_franchise",
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
    userid?: string;
    referBy?: string;
    parentFranchise?: string;
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
    numberOfEmployees: number; //delete this
    investmentAmount: number;
    royaltyPercentage: number; //delete this
    monthlyRevenue: number; 
    numberOfOutlets: number;
    menuSpecialty?: string; //delete this
    businessHours?: string; //delete this
    deliveryOptions?: boolean;
    isActive: boolean;
    ratings?: number; //delete this
    promotions?: string[]; //delete this
    targetMarket?: string; //delete this
    sustainabilityPractices?: string; //delete this
    trainingPrograms?: string[]; //delete this
    supportContact?: string; //delete this
    operationalChallenges?: string[]; //delete this
    competitiveAdvantages?: string; //delete this
    expansionPlans?: string; //delete this
    customerFeedback?: string[]; //delete this
    industryCertifications?: string[]; //delete this
    affiliatePrograms?: string[];
    performanceMetrics?: { [key: string]: number };
    franchiseRenewalInfo?: FranchiseeRenewalInfo;
    partnerships?: string[]; //delete this 
    marketingStrategies?: string[]; //delete this
    trainingHistory?: TrainingHistory[]; //delete this
    crisisManagementPlans?: string; //delete this
    diversityInitiatives?: string; //delete this

    // @todo add this
    //  contractId: string    @todo id of contract that is associated with this franchise if contract is expired then new contract id will be replaced  contract is in other table associate by id of contract
}

interface AddFranchiseePayload {
    userid?: string;
    referBy?: string;
    parentFranchise?: string;
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
    AddFranchiseePayload,
    FranchiseeLocation,
    FranchiseeRenewalInfo,
    TrainingHistory,
    FranchiseType
};
