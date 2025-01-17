
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
        {label: "Option 1", value: "option1"},
        {label: "Option 2", value: "option2"},
        {label: "Option 3", value: "option3"},
    ];

    const boolOptions: IOptions[] = [{
        label: "Yes",
        value: "Yes"
    },
        {
            label: "No",
            value: "No"
        }

    ];

    return [
        {
            question: "Do you like programming?",
            type: QuestionType.BOOLEAN,
            required: true,
            createdBy: 1,
        },
        {
            question: "What is your favorite programming language?",
            type: QuestionType.STRING,
            required: true,
            createdBy: 1,
        },
        {
            question: "Select the technologies you are familiar with:",
            type: QuestionType.MULTI_CHOICE,
            required: false,
            options: sampleOptions,
            createdBy: 1,
        },
        {
            question: "Choose your preferred database:",
            type: QuestionType.SINGLE_CHOICE,
            required: true,
            options: sampleOptions,
            createdBy: 2,
        },
        {
            question: "How many years of experience do you have in software development?",
            type: QuestionType.NUMBER,
            required: true,
            createdBy: 2,
        },
    ];
}

function getSampleAreas(): TPayloadArea[] {
    return [
        {title: "Area 1A", createdBy: 1},
        {title: "Area 1B", createdBy: 1},
        {title: "Area 1C", createdBy: 1},
        {title: "Area 2A", createdBy: 1},
        {title: "Area 2B", createdBy: 1},
        {title: "Area 2C", createdBy: 1},
        {title: "Area 3A", createdBy: 1},
        {title: "Area 3B", createdBy: 1},
    ];
}


function getSampleRegions(): TPayloadRegion[] {

    return [
        {
            title: "North Region",
            area: [1, 2, 3],
        },
        {
            title: "South Region",
            area: [4, 5, 6],
        },
        {

            title: "East Region",
            area: [7, 8]
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
        // proposalIds: [1, 2, 3, 4],
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
        address: "123 Main Street",
        city: "Mumbai",
        state: "Maharashtra",
        zipCode: "400001",
        country: "India",
        PAN: "ABCDE1234F"
    };

    const leadData: LeadPayload = {
        additionalInfo: "Interested in our premium services.",
        email: "john.doe@example.com",
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "+919876543210",
        status: LeadStatus.NEW,
        address: leadAddress,
        source: LeadSource.ADMIN,
        sourceInfo: "Lead created manually by admin.",
        campaignId: 1,
        referBy: null,
        notes: [],
        proposalModalId: null,
        amount: 50000,
        franchiseModals: [],
        affiliate: [],
        marketing: [],
        other: [
            {
                key: "What is your favorite programming language?", value: "Java",
                id: 0,
                title: "",
                type: extraFieldTypes.STRING,
                franchiseModelId: 0
            },
            {
                key: "Choose your preferred database", value: "option2",
                id: 0,
                title: "",
                type: extraFieldTypes.STRING,
                franchiseModelId: 0
            },
            {
                key: "Select the technologies you are familiar with:", value: "option2",
                id: 0,
                title: "",
                type: extraFieldTypes.STRING,
                franchiseModelId: 0
            },
            {
                key: "How many years of experience do you have in software development?", value: "4",
                id: 0,
                title: "",
                type: extraFieldTypes.STRING,
                franchiseModelId: 0
            },
            {
                key: "Do you like programming?", value: "Yes",
                id: 0,
                title: "",
                type: extraFieldTypes.STRING,
                franchiseModelId: 0
            },
        ],
        assignedUser: null
    };
    return leadData
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
