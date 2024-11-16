import {
    BaseModel,
    DeletionMetaData,
    UpdatedMetaData,
} from "../../../interfaces";

/**
 * the data stored in the db
 */
interface Commission extends UpdatedMetaData, BaseModel, DeletionMetaData {
    title: string;
    from: Date;
    to: Date;
    status: string;
}

export { Commission };
