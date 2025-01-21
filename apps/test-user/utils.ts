
import {QuestionRepo} from "../questions/models";
import {AreaRepo} from "../area/models/AreaRepo";
import {RegionRepo} from "../region/models/RegionRepo";
import {FranchiseModelRepo} from "../franchise_model/models";
import {ProposalModelRepo} from "../proposal_model/models";
import {CampaignAdRepo} from "../campaign/models";
import {
    BaseProduct,
    PRODUCT_STATUS,
    PRODUCTS_TYPE
} from "apps/product/interface/Product";
import {
    BaseProductsCategory,
    CATEGORY_TYPE,
    PRODUCT_CATEGORY_STATUS
} from "apps/products-category/interface/Category";
import {
    BaseProductOptions,
    PRODUCT_OPTIONS_STATUS
} from "../product/interface/ProductOptions";
import {BaseOptions} from "../options/interface/options";
import {BaseOptionsValue} from "../optionsValue/interface/optionValue";
import {TPayloadArea} from "../area/interface/Area";
import {TPayloadRegion} from "../region/models/Region";
import {CampaignPayload} from "../campaign/interface/campaign";
import {
    IOptions,
    QuestionType,
    TPayloadQuestion
} from "../questions/interface/Question";
import {
    TPayloadFranchiseModel
} from "../franchise_model/interface/franchiseModel";
import { extraFieldTypes, LeadAddress, LeadPayload, LeadSource, LeadStatus } from "apps/lead/interface/lead";


function getSampleQuestions(): TPayloadQuestion[] {

    const sampleOptions: IOptions[] = [
        {label: "Urban", value: "urban"},
        {label: "Semi-Urban", value: "semi-urban"},
        {label: "Rural", value: "rural"},
    ];

    const boolOptions: IOptions[] = [
        {label: "Yes", value: "Yes"},
        {label: "No", value: "No"}
    ];

    return [
        {
            question: "Are you currently running a food business?",
            type: QuestionType.BOOLEAN,
            required: true,
            createdBy: 1,
            options: boolOptions,
        },
        {
            question: "What inspired you to consider the Tongue Tinglers franchise?",
            type: QuestionType.STRING,
            required: true,
            createdBy: 1,
        },
        {
            question: "Select the type of location you are planning for the franchise:",
            type: QuestionType.SINGLE_CHOICE,
            required: true,
            options: sampleOptions,
            createdBy: 1,
        },
        {
            question: "What is your preferred method of attracting customers?",
            type: QuestionType.STRING,
            required: true,
            createdBy: 2,
        },
        {
            question: "How many years of experience do you have in managing a business?",
            type: QuestionType.NUMBER,
            required: true,
            createdBy: 2,
        },
    ];
}


function getSampleAreas(): TPayloadArea[] {
    return [
        // North Zone
        {title: "Delhi, Delhi", createdBy: 1},
        {title: "Chandigarh, Punjab", createdBy: 1},
        {title: "Jaipur, Rajasthan", createdBy: 1},
        {title: "Lucknow, Uttar Pradesh", createdBy: 1},
        {title: "Dehradun, Uttarakhand", createdBy: 1},

        // South Zone
        {title: "Bengaluru, Karnataka", createdBy: 1},
        {title: "Hyderabad, Telangana", createdBy: 1},
        {title: "Chennai, Tamil Nadu", createdBy: 1},
        {title: "Kochi, Kerala", createdBy: 1},
        {title: "Vijayawada, Andhra Pradesh", createdBy: 1},

        // East Zone
        {title: "Kolkata, West Bengal", createdBy: 1},
        {title: "Bhubaneswar, Odisha", createdBy: 1},
        {title: "Patna, Bihar", createdBy: 1},
        {title: "Ranchi, Jharkhand", createdBy: 1},
        {title: "Gangtok, Sikkim", createdBy: 1},

        // West Zone
        {title: "Mumbai, Maharashtra", createdBy: 1},
        {title: "Ahmedabad, Gujarat", createdBy: 1},
        {title: "Pune, Maharashtra", createdBy: 1},
        {title: "Jaipur, Rajasthan", createdBy: 1},
        {title: "Surat, Gujarat", createdBy: 1},

        // Central Zone
        {title: "Bhopal, Madhya Pradesh", createdBy: 1},
        {title: "Indore, Madhya Pradesh", createdBy: 1},
        {title: "Nagpur, Maharashtra", createdBy: 1},
        {title: "Raipur, Chhattisgarh", createdBy: 1},
        {title: "Jabalpur, Madhya Pradesh", createdBy: 1},
    ];
}


function getSampleRegions(): TPayloadRegion[] {
    return [
        {
            title: "North Region",
            area: [1, 2, 3, 4, 5], // Delhi, Chandigarh, Jaipur, Lucknow, Dehradun
        },
        {
            title: "South Region",
            area: [6, 7, 8, 9, 10], // Bengaluru, Hyderabad, Chennai, Kochi, Vijayawada
        },
        {
            title: "East Region",
            area: [11, 12, 13, 14, 15], // Kolkata, Bhubaneswar, Patna, Ranchi, Gangtok
        },
        {
            title: "West Region",
            area: [16, 17, 18, 19, 20], // Mumbai, Ahmedabad, Pune, Jaipur, Surat
        },
        {
            title: "Central Region",
            area: [21, 22, 23, 24, 25], // Bhopal, Indore, Nagpur, Raipur, Jabalpur
        },
    ];
}


function getSampleFranchiseModels(): TPayloadFranchiseModel[] {
    return [
        {
            title: "QSR (Quick Service Restaurant)",
            description: "A compact and efficient setup for serving customers quickly, ideal for high-footfall areas.",
            reqArea: 500, // in square feet
            investment: 1500000, // in INR
            runningCost: 50000, // in INR per month
            bestFor: ["Malls", "High Streets", "Food Courts"],
            inclusions: [
                "Kitchen Equipment",
                "POS System",
                "Signage and Branding",
                "Training and Support",
                "Uniforms for Staff",
            ],
        },
        {
            title: "Cloud Kitchen",
            description: "A delivery-only model, perfect for tapping into the growing demand for online food delivery.",
            reqArea: 300, // in square feet
            investment: 1000000, // in INR
            runningCost: 30000, // in INR per month
            bestFor: ["Online-Only Operations", "Low-Rent Locations",
                "Multiple Delivery Platforms"],
            inclusions: [
                "Kitchen Equipment",
                "Delivery Packaging",
                "Menu Optimization",
                "Integration with Delivery Platforms",
                "Staff Training",
            ],
        },
    ];
}

function getSampleProposals(): any[] {


    return [
        {
            title: "Basic QSR Proposal",
            prices: "1500000, 1800000, 2000000", // Basic, Standard, Premium
                                                 // pricing tiers in INR
            franchiseModel: 1, // QSR Model ID
            createdBy: 1
        },
        {
            title: "Advanced QSR Proposal",
            prices: "2000000, 2300000, 2500000", // Basic, Standard, Premium
                                                 // pricing tiers in INR
            franchiseModel: 1, // QSR Model ID
            createdBy: 1
        },
        {
            title: "Basic Cloud Kitchen Proposal",
            prices: "1000000, 1200000, 1400000", // Basic, Standard, Premium
                                                 // pricing tiers in INR
            franchiseModel: 2, // Cloud Kitchen Model ID
            createdBy: 1
        },
        {
            title: "Advanced Cloud Kitchen Proposal",
            prices: "1400000, 1600000, 1800000", // Basic, Standard, Premium
                                                 // pricing tiers in INR
            franchiseModel: 2, // Cloud Kitchen Model ID
            createdBy: 1
        },
    ];
}

async function createDummyMaster(user_id: number) {
    const questions = getSampleQuestions();
    const areas = getSampleAreas();
    const regions = getSampleRegions();
    const franchiseModels = getSampleFranchiseModels();
    const proposals = getSampleProposals();

    const qRepo = new QuestionRepo();
    const questionsProm = await Promise.all(questions.map(
        q => qRepo.create({createdBy: user_id, ...q}, user_id)));

    const aRepo = new AreaRepo();
    const areasProm = await Promise.all(areas.map(
        a => aRepo.create({createdBy: user_id, ...a}))).then(_ => {
        const rRepo = new RegionRepo();
        return Promise.all(regions.map(
            r => rRepo.create({createdBy: user_id, ...r})));
    });

    const fmRepo = new FranchiseModelRepo();
    const franchiseModelsProm = await Promise.all(franchiseModels.map(
        fm => fmRepo.create(fm, user_id))).then(_ => {
        const pRepo = new ProposalModelRepo();
        return Promise.all(proposals.map(p => pRepo.create(p)));
    });

    // Campaign creation logic
    const campaignPayload: CampaignPayload = {
        name: "Punjab 24-25 Q1",
        description: "Campaign in Punjabi 2025 Quarter 1",
        questionList: [5, 4, 3, 2, 1],
        organizationId: 1,
        regionId: 1,
        start: new Date("2025-01-01"),
        to: new Date("2025-02-28"),
        proposalIds: [1, 2, 3, 4],
        affiliateId: null,

    };

    const campaignRepo = new CampaignAdRepo();
    return campaignRepo.create(campaignPayload, 1);
}

function createDummyProducts(): {
    category: BaseProductsCategory,
    product: BaseProduct,
    options: BaseOptions[],
    optionValues: BaseOptionsValue[]
} {

    let productImg = ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1W6Al9fAgm1wipabmRo5xOjVkbyJRohoFhQ&s']

    const variations: BaseProductOptions[] = [
        {
            optionValueId: 1, // Example option value ID (e.g., "Red")
            price: 699.99, // Price for this variation
            stock: 50, // Available stock for this variation
            status: PRODUCT_OPTIONS_STATUS.ACTIVE, // Active status
            images: productImg,
        },
        {
            optionValueId: 2, // Example option value ID (e.g., "Blue")
            price: 699.99,
            stock: 30,
            status: PRODUCT_OPTIONS_STATUS.ACTIVE,
            images: productImg,
        },

    ]
    const category: BaseProductsCategory = {
        deletedBy: null,
        updatedBy: null,
        "name": "Non-Veg Main Course",
        "description": "North Indian Main Course Items",
        "slug": "non-veg-main-course",
        "status": PRODUCT_CATEGORY_STATUS.ACTIVE,
        "type": CATEGORY_TYPE.RETORT,
        "createdBy": 1
    }

    const options: BaseOptions[] = [
        {
            "name": "Color"
        },
        {
            "name": "Size"
        }
    ];
    const optionValues: BaseOptionsValue[] = [
        {
            "option_id": 1,
            "name": "Red"
        },
        {
            "option_id": 2,
            "name": "Large"
        }
    ]

    const product: BaseProduct = {
        name: "Smartphone X100",
        slug: "smartphone-x100",
        description: "The latest Smartphone X100 with advanced features and sleek design.",
        MOQ: 10, // Minimum Order Quantity
        category: 1, // Assuming category ID 5 corresponds to 'Electronics'
        type: PRODUCTS_TYPE.RETORT, // Example: PHYSICAL, DIGITAL
        status: PRODUCT_STATUS.ACTIVE, // Example: ACTIVE, INACTIVE DISCONTINUED
        images: productImg,
        tax_rate_id: 1, // Assuming tax rate ID 3 corresponds to 18%
        vendorId: 1, // Example vendor ID
        variations
    }

    return {
        category,
        options,
        optionValues,
        product,
    }
}

function createDummyLeads() {
    const leadAddress: LeadAddress = {
        address: "123 MG Road",
        city: "Mumbai",
        state: "Maharashtra",
        zipCode: "400001",
        country: "India",
        PAN: "ABCDE1234F"
    };

    const leadData: LeadPayload = {
        additionalInfo: "Interested in opening a Tongue Tinglers franchise in Mumbai.",
        email: "rahul.sharma@example.com",
        firstName: "Rahul",
        lastName: "Sharma",
        phoneNumber: "+919876543210",
        status: LeadStatus.NEW,
        address: leadAddress,
        source: LeadSource.ADMIN,
        sourceInfo: "Lead created manually by admin.",
        campaignId: 1,
        referBy: null,
        notes: [],
        proposalModalId: null,
        amount: 500000, // Franchise investment amount
        franchiseModals: [],
        affiliate: [],
        marketing: [],
        other: [
            {
                key: "Are you currently running a food business?", value: "Yes",
                id: 0,
                title: "",
                type: extraFieldTypes.STRING,
                franchiseModelId: 0
            },
            {
                key: "What inspired you to consider the Tongue Tinglers franchise?", value: "Passion for food business and brand recognition.",
                id: 0,
                title: "",
                type: extraFieldTypes.STRING,
                franchiseModelId: 0
            },
            {
                key: "Select the type of location you are planning for the franchise:", value: "Urban",
                id: 0,
                title: "",
                type: extraFieldTypes.STRING,
                franchiseModelId: 0
            },
            {
                key: "What is your preferred method of attracting customers?", value: "Social media marketing and local events.",
                id: 0,
                title: "",
                type: extraFieldTypes.STRING,
                franchiseModelId: 0
            },
            {
                key: "How many years of experience do you have in managing a business?", value: "5",
                id: 0,
                title: "",
                type: extraFieldTypes.NUMBER,
                franchiseModelId: 0
            },
        ],
        assignedUser: null
    };
    return leadData;
}


export {
    getSampleQuestions,
    getSampleRegions,
    getSampleAreas,
    getSampleFranchiseModels,
    getSampleProposals,
    createDummyMaster,
    createDummyProducts,
    createDummyLeads
}
