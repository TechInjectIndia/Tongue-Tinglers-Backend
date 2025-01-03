// import { NextFunction, Request, Response } from "express";
// import { get, isEmpty } from "lodash";
// import { sendResponse } from "../../../libraries";
// import { RESPONSE_TYPE, SUCCESS_MESSAGE, ERROR_MESSAGE } from "../../../constants";
// import { EmailRepo } from '../models/email';
// import { CampaignRepo } from '../models/campaign';
// import { SubscriberRepo } from '../models/subscriber';

// export default class EmailController {
//     static async create(req: Request, res: Response, next: NextFunction) {
//         try {
//             const campaignId = get(req?.body, "campaignId", "");
//             const subscriberId = get(req?.body, "subscriberId", "");
//             const status = 'draft';

//             const existingCampaign = await new CampaignRepo().get(campaignId as number);
//             const existingSubscriber = await new SubscriberRepo().get(subscriberId as number);
//             if (existingCampaign && existingSubscriber) {
//                 const Email = await new EmailRepo().create({ campaignId, subscriberId, status });
//                 return res
//                     .status(200)
//                     .send(
//                         sendResponse(
//                             RESPONSE_TYPE.SUCCESS,
//                             SUCCESS_MESSAGE.CREATED,
//                             Email
//                         )
//                     );

//             }
//         } catch (err) {
//             console.error("Error:", err);
//             return res.status(500).send({
//                 message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
//             });
//         }
//     }

//     static async list(req: Request, res: Response, next: NextFunction) {
//         try {
//             const size = get(req?.query, "size", 10);
//             const skip = get(req?.query, "skip", 1);
//             const search = get(req?.query, "search", "");
//             const trashOnly = get(req?.query, "trashOnly", "");
//             let sorting = get(req?.query, "sorting", "id DESC");
//             sorting = sorting.toString().split(" ");

//             const Emails = await new EmailRepo().list({
//                 offset: skip as number,
//                 limit: size as number,
//                 search: search as string,
//                 sorting: sorting,
//                 trashOnly: trashOnly as string
//             });

//             return res
//                 .status(200)
//                 .send(
//                     sendResponse(
//                         RESPONSE_TYPE.SUCCESS,
//                         SUCCESS_MESSAGE.FETCHED,
//                         Emails
//                     )
//                 );
//         } catch (err) {
//             console.error("Error:", err);
//             return res.status(500).send({
//                 message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
//             });
//         }
//     }

//     static async update(req: Request, res: Response, next: NextFunction) {
//         try {
//             const id = get(req?.params, "id", 0);
//             const campaignId = get(req?.body, "campaignId", "");
//             const subscriberId = get(req?.body, "subscriberId", 1);
//             const status = get(req?.body, "status", '');

//             const Email = await new EmailRepo().update(id as number, campaignId, subscriberId, { campaignId, subscriberId, status });
//             return res
//                 .status(200)
//                 .send(
//                     sendResponse(
//                         RESPONSE_TYPE.SUCCESS,
//                         SUCCESS_MESSAGE.UPDATED,
//                         Email
//                     )
//                 );
//         } catch (err) {
//             console.error("Error:", err);
//             return res.status(500).send({
//                 message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
//             });
//         }
//     }

//     static async get(req: Request, res: Response, next: NextFunction) {
//         try {
//             const id = get(req?.params, "id", 0);
//             const Email = await new EmailRepo().get(id as number);
//             if (isEmpty(Email)) {
//                 return res
//                     .status(400)
//                     .send(
//                         sendResponse(
//                             RESPONSE_TYPE.ERROR,
//                             ERROR_MESSAGE.NOT_EXISTS
//                         )
//                     );
//             }

//             return res
//                 .status(200)
//                 .send(
//                     sendResponse(
//                         RESPONSE_TYPE.SUCCESS,
//                         SUCCESS_MESSAGE.FETCHED,
//                         Email
//                     )
//                 );
//         } catch (err) {
//             console.error("Error:", err);
//             return res.status(500).send({
//                 message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
//             });
//         }
//     }

//     static async delete(req: Request, res: Response, next: NextFunction) {
//         try {
//             const ids = get(req?.body, "ids", "");
//             const Email = await new EmailRepo().delete(ids);
//             return res
//                 .status(200)
//                 .send(
//                     sendResponse(
//                         RESPONSE_TYPE.SUCCESS,
//                         SUCCESS_MESSAGE.DELETED,
//                         Email
//                     )
//                 );
//         } catch (err) {
//             console.error("Error:", err);
//             return res.status(500).send({
//                 message: err.message || ERROR_MESSAGE.INTERNAL_SERVER_ERROR,
//             });
//         }
//     }

// }