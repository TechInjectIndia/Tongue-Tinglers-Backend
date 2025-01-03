import {
    IOptions,
    QuestionType,
    TPayloadArea,
    TPayloadFranchiseModel,
    TPayloadProposalModel,
    TPayloadQuestion,
    TPayloadRegion
} from "../../interfaces";
import {QuestionRepo} from "../questions/models";
import {AreaRepo} from "../area/models/AreaRepo";
import {RegionRepo} from "../region/models/RegionRepo";
import {FranchiseModelRepo} from "../franchise_model/models";
import {ProposalModelRepo} from "../proposal_model/models";
import {CampaignAdRepo} from "../campaign/models";

function getSampleQuestions(): TPayloadQuestion[] {

    const sampleOptions: IOptions[] = [
        {label: "Option 1", value: "option1"},
        {label: "Option 2", value: "option2"},
        {label: "Option 3", value: "option3"},
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

function getSampleProposals(): TPayloadProposalModel[] {


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
    const campaignPayload = {
        name: "Punjab 24-25 Q1",
        description: "Campaign in Punjabi 2025 Quarter 1",
        questionList: [5, 4, 3, 2, 1],
        organizationId: 1,
        regionId: 1,
        start: "2025-01-01",
        to: "2025-02-28",
        proposalIds: [1, 2, 3, 4],
        affiliateId: null,
        createdBy: user_id,
    };

    const campaignRepo = new CampaignAdRepo();
    return campaignRepo.create(campaignPayload);
}


export {
    getSampleQuestions,
    getSampleRegions,
    getSampleAreas,
    getSampleFranchiseModels,
    getSampleProposals,
    createDummyMaster
}
