import { MetaUser } from "apps/user/interface/User"


interface Affiliate {
    id: number,
    type: string,
    codes: Record<string, string>,
    userId: number
}

interface ParsedAffiliate {
    id: number,
    type: string,
    codes: string,
    user: MetaUser
    createdAt: Date,
    updatedAt: Date,
}

export {Affiliate, ParsedAffiliate}