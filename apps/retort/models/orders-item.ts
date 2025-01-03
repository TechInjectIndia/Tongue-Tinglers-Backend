// const { Op } = require("sequelize");
// import {
//     TAddRetortOrderItem,
//     TRetortOrderFilters,
// } from "../../../types/retort";
// import { RetortOrderItemsModel } from "../../../database/schema";
// import IBaseRepo from '../controllers/controller/IOrderItemsController';

// export class RetortOrderItemRepo implements IBaseRepo<TAddRetortOrderItem, TRetortOrderFilters> {
//     constructor() { }

//     public async create(data: TAddRetortOrderItem): Promise<TAddRetortOrderItem> {
//         const response = await RetortOrderItemsModel.create(data);
//         return response;
//     }
// }
