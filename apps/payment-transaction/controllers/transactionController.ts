import {Request, Response} from "express";
import {get} from "lodash";

import {sendResponse} from "../../../libraries";
import {RESPONSE_TYPE, SUCCESS_MESSAGE} from "../../../constants";
import {TransactionRepo} from "../repos/TransactionRepo";
import {Pagination} from "../../common/models/common";
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


export default class transactionRouter {
    static async getAllLogs(req: Request, res: Response) {
        try {
            const page = <number>get(req.query, 'page', 1);
            if (isNaN(page) || page < 1) {
                throw new Error(
                    'Page number must be greater than 0')
            }

            const limit = <number>get(req.query, 'limit', 10);
            if (isNaN(limit) || limit <= 0) {
                throw new Error(
                    'limit must be a positive number greater than 0')
            }

            // For text search
            const search = <string>get(req.query, 'search', "");
            // For filtering search
            let entity = get(req.query, 'entity');
            let status = get(req.query, 'status');
            let minAmount = get(req.query, 'minAmount');
            let maxAmount = get(req.query, 'maxAmount');

            // Parse filters into an object
            let filterObj:any = {};
            if(entity) filterObj.entity = entity
            if(status) filterObj.status = status
            if(minAmount) filterObj.minAmount = minAmount
            if(maxAmount) filterObj.maxAmount = maxAmount

            const transactions: Pagination<any> =
                await new TransactionRepo().getAll(page, limit, search,
                    filterObj);
            return res.status(200).send(
                sendResponse(RESPONSE_TYPE.SUCCESS, SUCCESS_MESSAGE.FETCHED, {
                    ...transactions,
                    currentPage: page,
                }),
            );
        }
        catch (error) {
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

