import { ParsedUser } from "../../user/interface/user"

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
    user: ParsedUser
    createdAt: Date,
    updatedAt: Date,
}

export {Affiliate, ParsedAffiliate}