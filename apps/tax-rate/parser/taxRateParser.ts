import { parseUserToMetaUser } from "apps/user/parser/user-parser";
import { ParsedTaxRate } from "../interface/taxRate";

const parseTaxRate = (data:any):ParsedTaxRate => {
    const taxRateData: ParsedTaxRate = {
        id: data.id,
        title: data.title,
        value: data.value,
        createdBy: parseUserToMetaUser(data.createdByUser),
        updatedBy: data.updatedByUser ? parseUserToMetaUser(data.updatedByUser) : null,
        deletedBy: data.deletedByUser ? parseUserToMetaUser(data.deletedByUser) : null,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        deletedAt: data.deleted_at,
        logs: data.logs
    }
    return taxRateData
}

export {parseTaxRate}