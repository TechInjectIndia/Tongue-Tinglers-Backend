import { BaseModelIdNumber, DeletionMetaData, UpdatedMetaData } from "interfaces";
import { STORAGE_LOCATION_STAUS, STORAGE_LOCATION_TYPE } from "./StorageLocationMisc";

interface IStorageLocation extends BaseModelIdNumber, UpdatedMetaData, DeletionMetaData {
    id: number;
    name: string;
    description: string;
    type: STORAGE_LOCATION_TYPE;
    status: STORAGE_LOCATION_STAUS;
}

interface ICreateStorageLocation {
    name: string;
    description: string;
    type: STORAGE_LOCATION_TYPE;
    status: STORAGE_LOCATION_STAUS
}


export { IStorageLocation, ICreateStorageLocation };