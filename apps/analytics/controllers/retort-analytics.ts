// import { NextFunction, Request, Response } from "express";
// import { get } from "lodash";
// import { sendResponse } from "../../../libraries";
// import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
// import { AnalyticsModel } from '../models/retort-analytics';

// export default class RetortAnalyticsController {
//     static async list(req: Request, res: Response, next: NextFunction) {
//         try {
//             // Extract the 'range' parameter from the query
//             const range = get(req.query, "range", "Week"); // Default to 'Week' if not provided
            
//             // Here you can add additional logic based on the range if needed
//             const analytics = await new AnalyticsModel().retortAnalytics({ range }); // Adjust your method to accept the range parameter

//             return res.status(200).send(
//                 sendResponse(
//                     RESPONSE_TYPE.SUCCESS,
//                     SUCCESS_MESSAGE.FETCHED,
//                     analytics
//                 )
//             );
//         } catch (err) {
//             console.error("Error fetching analytics:", err); // Improved logging
//             return res.status(500).send({
//                 message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
//             });
//         }
//     }
// }
