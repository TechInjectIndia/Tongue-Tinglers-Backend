import { parseUserToMetaUser } from "apps/user/parser/user-parser"
import {ParsedChecklist} from "../interface/IChecklist"
import { ParseFranchiseModel } from "apps/franchise_model/parser/franchiseModelParser"

const parseChecklist = (checklist: any) => {
    const data: ParsedChecklist = {
        id: checklist.id,
        title: checklist.title,
        checkPoints: checklist.checkPoints,
        franchiseModelId: ParseFranchiseModel(checklist.franchiseModal),
        createdBy: parseUserToMetaUser(checklist.createdByUser),
        updatedBy: checklist.updatedByUser ? parseUserToMetaUser(checklist.updatedByUser) : null,
        deletedBy: checklist.deletedByUser ? parseUserToMetaUser(checklist.deletedByUser) : null,
        createdAt: checklist.createdAt,
        updatedAt: checklist.updatedAt ? checklist.updatedAt : null,
        deletedAt: checklist.deletedAt ? checklist.deletedAt : null,
    }
    return data
}

export {parseChecklist}