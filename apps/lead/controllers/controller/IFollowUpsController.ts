import { Response } from "express";
import { TQueryFilters } from '../../../../types'

interface IFollowUpsController<T, F extends TQueryFilters> {
    getFollowUpsToday(startDate: Date, endDate: Date, assignedTo: number, getAttributes: string): Promise<T>;
}

export default IFollowUpsController;
