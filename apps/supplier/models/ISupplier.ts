import { BaseModelIdNumber, DeletionMetaData, UpdatedMetaData } from "interfaces";
import { SUPPLIER_STAUS } from "./SupplierMisc";

interface ISupplier extends BaseModelIdNumber, UpdatedMetaData, DeletionMetaData {
    id: number;
    name: string;
    email: string | null;
    phone: string;
    status: SUPPLIER_STAUS;
}

interface ICreateSupplier {
    name: string;
    email: string | null;
    phone: string;
}


export { ISupplier, ICreateSupplier };