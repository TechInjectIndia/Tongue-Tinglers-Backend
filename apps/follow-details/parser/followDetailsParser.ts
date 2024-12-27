import {ParsedFollowDetails} from "../interface/followDetails"

const parseFollowDetails = (detail: any):ParsedFollowDetails => {
    const data: ParsedFollowDetails = {
        id: detail.id,
        followedBy: detail.followed,
        description: detail.description,
        followedDate: detail.followedDate,
        notes: detail.notes,
        status: detail.status,
        reminder: detail.reminder,
        createdBy: detail.created,
        updatedBy: detail.updatedBy,
        deletedBy: detail.deletedBy,
        createdAt: detail.createdAt,
        updatedAt: detail.updatedAt
    }
    return data
}

export { parseFollowDetails }