import { ParsedFranchiseModels } from "../interface/franchiseModel";

const ParseFranchiseModel = (modal: ParsedFranchiseModels): ParsedFranchiseModels => {
    const data: ParsedFranchiseModels = {
        id: modal.id,
        bestFor: modal.bestFor,
        description: modal.description,
        inclusions: modal.inclusions,
        investment: modal.investment,
        reqArea: modal.reqArea,
        runningCost: modal.runningCost,
        title: modal.title,
        createdAt: modal.createdAt,
        updatedAt: modal.updatedAt
    }
    return data;
}

export {ParseFranchiseModel}

