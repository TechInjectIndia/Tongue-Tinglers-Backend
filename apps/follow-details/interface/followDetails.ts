import {BaseMetaUsers, BaseMeta} from '../../../database/schema/base/Base'

interface BaseFollowDetails extends BaseMetaUsers {
    followedDate: Date | null;
    followedBy: number;
    notes: string | null;
    description: string | null;
    status: followStatus;
    reminder: Date | null;
}

interface FollowDetails extends BaseFollowDetails {
    id: number;
}

enum followStatus {
    FOLLOWED_UP = "followed-up",
    NOT_FOLLOWED_UP = "not-followed-up",
}

export {
    BaseFollowDetails,
    FollowDetails,
    followStatus
}