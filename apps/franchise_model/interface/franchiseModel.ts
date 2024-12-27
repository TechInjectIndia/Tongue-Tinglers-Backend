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

export {FranchiseModelsPayload, ParsedFranchiseModels}