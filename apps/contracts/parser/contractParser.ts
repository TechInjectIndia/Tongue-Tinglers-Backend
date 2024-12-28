import { ParsedContract } from "../interface/contracts";
import {parseLead} from "../../lead/parser/leadParser"
import {parseOrganization} from "../../organization/parser/organizationParser"
const parseContract = (contract:any):ParsedContract => {

    const data: ParsedContract = {
        id: contract.id,
        additionalInfo: contract.additionalInfo,
        amount: contract.amount,
        dueDate: contract.dueDate,
        leadId: contract.leadId,
        lead: parseLead(contract.lead),
        organizationId: contract.organizationId,
        organization: contract.organization ? parseOrganization(contract.organization) : null,
        logs: contract.logs,
        validity: contract.validity,
        notes: contract.notes,
        signedDocs: contract.signedDocs,
        signedDate: contract.signedDate,
        templateId: contract.templateId,
        createdAt:contract.createdAt,
        createdBy: contract.createdBy,
        updatedAt: contract.updatedAt,
        updatedBy: contract.updatedBy,
        deletedAt: contract.deletedAt,
        deletedBy: contract.deletedBy,
        payment: contract.payment,
        status: contract.status
    }
    return data
}

export { parseContract }