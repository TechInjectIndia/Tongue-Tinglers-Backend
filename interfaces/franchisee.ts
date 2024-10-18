
interface FranchiseeLocation {
    contactPhone: string;
    location: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
}

interface FranchiseeAttributes {
    id: string;
    name: string;
    ownerName: string;
    contactEmail: string[];
    franchiseLocations: FranchiseeLocation[];
    establishedDate: Date;
    franchiseAgreementSignedDate: Date;
    franchiseType: string;
    numberOfEmployees: number;
    investmentAmount: number;
    royaltyPercentage: number;
    monthlyRevenue: number;
    numberOfOutlets: number;
    menuSpecialty: string;
    businessHours: string;
    deliveryOptions: boolean;
    isActive: boolean;
}

export {
    FranchiseeAttributes,
    FranchiseeLocation
}