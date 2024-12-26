import {ParsedFollowDetails} from "../interface/followDetails"
import { parseUserToMetaUser } from "../../user/parser/user-parser"
const ParseFollowDetails = (detail: ParsedFollowDetails): ParsedFollowDetails => {
    const data:ParsedFollowDetails = {
        id: detail.id,
        followedDate: detail.followedDate,
        followedBy: detail.followedBy,
        notes: detail.notes,
        description: detail.description,
        status: detail.status,
        reminder: detail.reminder,
        createdBy: parseUserToMetaUser(detail.createdBy),
        updatedBy: detail.updatedBy ? parseUserToMetaUser(detail.updatedBy) : null,
        deletedBy: detail.deletedBy ? parseUserToMetaUser(detail.deletedBy) : null,
        createdAt: detail.createdAt,
        updatedAt: detail.updatedAt
    }
    return data
}

export { ParseFollowDetails }