import { Response } from "express";
import { TQueryFilters } from '../../../../types'

interface IFollowUpsController<T, F extends TQueryFilters> {
    getFollowUpsToday(assignedTo: number, getAttributes: string): Promise<T>;
}

export default IFollowUpsController;
