import { BaseMeta } from "apps/common/models/Base";
import { SUPPLIER_STAUS } from "./SupplierMisc";
import { Address, BaseAddress } from "types";

interface ICreateSupplier {
    name: string;
    email: string | null;
    phone: string;
    addressId: number;
    gst: string | null;
    pan: string | null;
    status: SUPPLIER_STAUS;
    createdBy: number;
}

interface ISupplierRequest {
    name: string;
    email: string | null;
    phone: string;
    address: BaseAddress;
    gst: string | null;
    pan: string | null;
    createdBy: number;
}

interface ISupplierUpdateRequest {
    name: string;
    email: string | null;
    phone: string;
    addressId: number;
    address: BaseAddress;
    gst: string | null;
    pan: string | null;
    createdBy: number;
}

interface ISupplier extends Omit<ICreateSupplier, "address">, BaseMeta {
    status: SUPPLIER_STAUS;
    addressId: number;
}

interface ISupplierResponse extends ISupplier {
    address: Address;
}


export { ISupplier, ICreateSupplier, ISupplierResponse, ISupplierRequest, ISupplierUpdateRequest };