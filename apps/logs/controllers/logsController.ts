import { LogModel } from "../../../database/schema/logs/LogsModels";
import { Model, ModelStatic } from "sequelize";
import { Request, Response } from "express";
import { get } from "lodash";
import { BaseProduct, Pagination, Product } from "../../../interfaces";
import RepoProvider from "../../RepoProvider";
import { sendResponse } from "../../../libraries";
import { RESPONSE_TYPE, SUCCESS_MESSAGE } from "../../../constants";
import { Log } from "../models/Log";
//
// export const logModelAction = async <T extends Model<any, any>>(
//     action: string,
//     modelName: string,
//     instance: T,
//     options: any,
// ) => {
//     try {
//         const primaryKey = (instance.constructor as ModelStatic<Model<any>>)
//             .primaryKeyAttributes[0];
//
//         let dataToLog: Record<string, any>;
//
//         if (action === "create") {
//             dataToLog = instance.toJSON();
//         } else if (action === "update") {
//             const changes: Record<string, any> = {};
//
//             for (const key in instance.dataValues) {
//                 const currentValue = instance[key];
//                 const previousValue = instance.previous(key);
//
//                 if (currentValue !== previousValue) {
//                     changes[key] = {
//                         before: previousValue,
//                         after: currentValue,
//                     };
//                 }
//             }
//
//             dataToLog = changes;
//         } else if (action === "delete") {
//             dataToLog = instance.toJSON();
//         }
//         await LogModel.create({
//             action,
//             model: modelName,
//             recordId: instance.get(primaryKey),
//             data: dataToLog,
//             userId: options.userId || null,
//             timestamp: new Date(),
//         });
//     } catch (error) {
//         console.error("Error logging action:", error);
//     }
// };


export default class logsController {
    static async getAllLogs(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page.toString(), 0) || 1;
            const limit = parseInt(req.query.limit.toString(), 10) || 10;
            const search = (req.query.search as string) || ""; // For text search
            const filters = (req.query.filters as string) || "";

            // Parse filters into an object
            let filterObj = {};
            if (filters) {
                try {
                    filterObj = JSON.parse(filters);
                } catch (error) {
                    return res
                        .status(400)
                        .send(
                            sendResponse(
                                RESPONSE_TYPE.ERROR,
                                "Invalid filter format. It should be a valid JSON string.",
                            ),
                        );
                }
            }
            const logs: Pagination<Log> =
                await RepoProvider.LogRepo.getAll(page, limit, search, filterObj);
            return res.status(200).send(
                sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.FETCHED, {
                    ...logs,
                    currentPage: page,
                }),
            );
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .send(
                    sendResponse(
                        RESPONSE_TYPE.ERROR,
                        "An error occurred while fetching products.",
                    ),
                );
        }
    }


}

