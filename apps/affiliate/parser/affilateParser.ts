import { parseUserToMetaUser } from "../../user/parser/user-parser";
import { ParsedAffiliate } from "../interface/affiliate";

const ParseAffiliate = (affiliate: ParsedAffiliate): ParsedAffiliate => {
    const data =  {
        id: affiliate.id,
        type: affiliate.type,
        codes: affiliate.codes,
        user: affiliate.user,
        createdAt: affiliate.createdAt,
        updatedAt: affiliate.updatedAt,
        deletedAt:affiliate.deletedAt,
        createdBy: affiliate.createdBy,
        updatedBy: affiliate.updatedBy,
        deletedBy:affiliate.deletedBy,
    }
    return data;
}

export {ParseAffiliate}