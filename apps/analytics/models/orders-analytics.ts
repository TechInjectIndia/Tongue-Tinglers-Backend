// const { Sequelize } = require('sequelize');
// import {
//     TAnalyticssList,
// } from "../../../types/analytics";
// import { OrdersModel } from "../../../database/schema";

// export class AnalyticsModel {
//     constructor() { }

//     public async orderCountByDateWise(startDate: Date, endDate: Date): Promise<TAnalyticssList | any> {
//         OrdersModel.findAll({
//             attributes: [
//                 'order_status',
//                 [Sequelize.fn('COUNT', Sequelize.col('order_status')), 'count']
//             ],
//             where: {
//                 createdAt: {
//                     [Sequelize.between]: [startDate, endDate]
//                 },
//             },
//             group: 'order_status'
//         });
//     }
// }
