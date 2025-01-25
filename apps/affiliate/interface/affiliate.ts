import { BaseMeta, ParsedMeta } from "apps/common/models/Base"
import { SocialMediaDetails } from "apps/lead/interface/lead";
import { MetaUser } from "apps/user/interface/user"


interface AffiliatePayload {
    id: number,
    type: string,
    codes: Record<string, string>,
    userId: number;
    organizationId:number;
}


interface AffiliateTable extends AffiliatePayload , BaseMeta{

}


interface ParsedAffiliate extends ParsedMeta {
    id: number,
    type: string,
    codes: string,
    user: MetaUser
    organisationId:number,
    sm:SocialMediaDetails
}

export {AffiliatePayload,AffiliateTable, ParsedAffiliate}