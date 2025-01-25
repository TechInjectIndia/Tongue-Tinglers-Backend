import { parseUserToMetaUser } from "../../user/parser/user-parser";
import { ParsedAffiliate } from "../interface/Affiliate";

const ParseAffiliate = (affiliate: any): ParsedAffiliate => {
    return {
        id: affiliate.id,
        type: affiliate.type,
        codes: affiliate.codes,
        user: affiliate.user,
        organisationId:affiliate.organisation,
        createdAt: affiliate.createdAt,
        updatedAt: affiliate.updatedAt,
        createdBy: affiliate.createdBy,
        updatedBy: affiliate.updatedBy,
        deletedAt: affiliate.deletedAt,
        deletedBy: affiliate.deletedBy,
        sm:affiliate.sm
    }
}

export {ParseAffiliate}