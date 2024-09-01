import { NextFunction, Response } from "express";
import { TQueryFilters, TAddUser, TEditUser, TEditUserProfile } from '../../../../types'

import {
    TAnalyticsFilters,
    TAnalyticssList,
} from "../../../../types/analytics";

interface IController<T, F extends TQueryFilters> {
    list(filters: F): Promise<Response<T[]>>;
}

export default IController;
