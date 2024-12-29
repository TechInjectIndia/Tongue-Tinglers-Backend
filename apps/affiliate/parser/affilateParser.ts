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
    }
    return data;
}

export {ParseAffiliate}