import type {
    BaseModel,
    DeletionMetaData,
    UpdatedMetaData,
} from "../../../../interfaces";

interface Commission extends UpdatedMetaData, BaseModel, DeletionMetaData {
    title: string;
    from: Date;
    to: Date;
    status: string;
}
