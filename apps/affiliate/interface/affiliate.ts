import { BaseMeta, ParsedMeta } from "apps/common/models/Base"
import { MetaUser } from "apps/user/interface/user"


interface Affiliate extends BaseMeta{
    id: number,
    type: string,
    codes: Record<string, string>,
    userId: number
}

interface ParsedAffiliate extends ParsedMeta {
    id: number,
    type: string,
    codes: string,
    user: MetaUser
    createdAt: Date,
    updatedAt: Date,
}

export {Affiliate, ParsedAffiliate}