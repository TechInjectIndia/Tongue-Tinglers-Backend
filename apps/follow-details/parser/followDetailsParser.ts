import {ParsedFollowDetails} from "../interface/followDetails"

const parseFollowDetails = (detail: any):ParsedFollowDetails => {
    const data: ParsedFollowDetails = {
        id: detail.id,
        followedBy: detail.followedBy,
        description: detail.description,
        followedDate: detail.followedDate,
        notes: detail.notes,
        status: detail.status,
        reminder: detail.reminder,
        createdBy: detail.createdBy,
        updatedBy: detail.updatedBy,
        deletedBy: detail.deletedBy,
        createdAt: detail.createdAt,
        updatedAt: detail.updatedAt
    }
    return data
}

export { parseFollowDetails }