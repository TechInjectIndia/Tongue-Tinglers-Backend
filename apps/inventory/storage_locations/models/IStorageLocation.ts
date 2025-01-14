import { BaseMeta } from "apps/common/models/Base";
import { STORAGE_LOCATION_STAUS, STORAGE_LOCATION_TYPE } from "./StorageLocationMisc";



interface ICreateStorageLocation {
    name: string;
    description: string;
    type: STORAGE_LOCATION_TYPE;
    status: STORAGE_LOCATION_STAUS,
    createdBy: number;
}

interface IStorageLocation extends ICreateStorageLocation, BaseMeta {

}


export { IStorageLocation, ICreateStorageLocation };