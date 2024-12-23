import { Log } from "../models/Log";
import { Pagination } from "../../../interfaces/products";
import { Model, ModelStatic } from "sequelize";
import { LogModel } from "../../../database/schema/logs/LogsModels";

export interface ILogsRepo {
    getAll(
        page: number,
        limit: number,
        search: string,
        filters: object,
    ): Promise<Pagination<Log>>;

    // Define logModelAction method
    logModelAction<T extends Model<any, any>>(
        action: string,
        modelName: string,
        instance: T, 
        options: any,
    ): Promise<void>; // Return type would depend on your use case (e.g., void, boolean, or a more specific result type)

    getLogsByModelNameAndId(modelName: string, recordId: number): Promise<Log[]>;
}
