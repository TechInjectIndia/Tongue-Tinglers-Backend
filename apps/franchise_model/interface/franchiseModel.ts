interface FranchiseModelsPayload {
    description: string,
    title: string,
    reqArea: number,
    investment: number,
    runningCost: number,
    bestFor: string[],
    inclusions: string[],
}

interface ParsedFranchiseModels {
    id: number;
    description: string;
    title: string;
    reqArea: number;
    investment: number;
    runningCost: number;
    bestFor: string[];
    inclusions: string[];
    createdAt: Date;
    updatedAt: Date;
}


interface FranchiseModels {
    id: number,
    description: string,
    title: string,
    reqArea: number,
    investment: number,
    runningCost: number,
    bestFor: string[],
    inclusions: string[],
}

type TPayloadFranchiseModel = {
    description: string,
    title: string,
    reqArea: number,
    investment: number,
    runningCost: number,
    bestFor: string[],
    inclusions: string[],
}

type FranchiseModelsList = {
    total: number;
    data: FranchiseModels[];
};

export { FranchiseModelsPayload, ParsedFranchiseModels, FranchiseModels, TPayloadFranchiseModel, FranchiseModelsList }