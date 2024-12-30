import { parseLead } from "apps/lead/parser/leadParser"
import { ParsedContract } from "../interface/Contract"
import { parseOrganization } from "apps/organization/parser/organizationParser"

const parseContract = (contract:any):ParsedContract => {

    const data: ParsedContract = {
        id: contract.id,
        additionalInfo: contract.additionalInfo,
        amount: contract.amount,
        dueDate: contract.dueDate,
        leadId: contract.lead ? parseLead(contract.lead) : null,
        organizationId: contract.organization ? parseOrganization(contract.organization) : null,
        logs: contract.logs,
        validity: contract.validity,
        notes: contract.notes,
        signedDocs: contract.signedDocs,
        signedDate: contract.signedDate,
        templateId: contract.templateId,
        createdAt: contract.createdAt,
        createdBy: contract.createdBy,
        updatedAt: contract.updatedAt,
        updatedBy: contract.updatedBy,
        deletedAt: contract.deletedAt,
        deletedBy: contract.deletedBy,
        payment: contract.payment,
        status: contract.status,
        proposalData: contract.proposalData ? contract.proposalData : null,
    }
    return data
}

export { parseContract }