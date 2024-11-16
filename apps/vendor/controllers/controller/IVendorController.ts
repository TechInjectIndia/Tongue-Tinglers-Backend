import { Request, Response, NextFunction } from "express";
import {
    TListFilters,
    TQueryFilters
} from "../../../../types";
import {
    TVendorList,
    TPayloadVendor,
    TVendorFilters,
    IVendorAttributes,
} from "../../../../interfaces";

/**
 * Interface for Vendor Controller.
 */
interface IVendorController<T, F extends TQueryFilters> {
    get(id: string): Promise<IVendorAttributes | null>
    getVendorByAttr(whereName: string, whereVal: any, getAttributes: string[]): Promise<IVendorAttributes | null>
    list(filters: TVendorFilters): Promise<TVendorList>
    create(data: TPayloadVendor): Promise<IVendorAttributes>
    update(id: string, data: TPayloadVendor): Promise<number>
    delete(ids: string[]): Promise<number>
}

export default IVendorController;
