import {BaseMetaUsers, BaseMeta} from '../../../database/schema/base/Base'
import {ParsedUser} from '../../user/interface/user'
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

interface ParsedFollowDetails {
    id: number;
    followedDate: Date | null;
    followedBy: ParsedUser;
    notes: string | null;
    description: string | null;
    status: followStatus;
    reminder: Date | null;
    createdBy: ParsedUser;
    updatedBy: ParsedUser | null;
    deletedBy: ParsedUser | null;
    createdAt: Date;
    updatedAt: Date;
}

export {
    BaseFollowDetails,
    FollowDetails,
    followStatus,
    ParsedFollowDetails
}