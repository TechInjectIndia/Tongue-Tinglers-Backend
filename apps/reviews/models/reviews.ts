// const { Op } = require("sequelize");
// import {
//     TReviews,
//     TAddReviews,
//     TReviewsFilters,
//     TReviewssList,
// } from "../../../types/reviews";

// import IBaseRepo from '../controllers/controller/IReviewsController';

// export class ReviewsRepo implements IBaseRepo<TReviews, TReviewsFilters> {
//     constructor() { }

//     public async getReviewsByAttr(whereName: any, whereVal: any, getAttributes: any = ['*']): Promise<TReviews> {
//         const whereAttributes = { [whereName]: whereVal }
//         const data = await ReviewsModel.findOne({
//             raw: true,
//             attributes: getAttributes,
//             where: whereAttributes
//         });
//         return data;
//     }

//     public async list(filters: TReviewsFilters): Promise<TReviewssList> {
//         const total = await ReviewsModel.count({
//             where: {
//                 review_text: {
//                     [Op.iLike]: `%${filters.search}%`,
//                 },
//             },
//         });
//         const data = await ReviewsModel.findAll({
//             order: [filters?.sorting],
//             offset: filters.offset,
//             limit: filters.limit,
//             where: {
//                 review_text: {
//                     [Op.iLike]: `%${filters.search}%`,
//                 },
//             },
//         });
//         return { total, data };
//     }

//     public async create(data: TAddReviews): Promise<TReviews> {
//         const response = await ReviewsModel.create(data);
//         return response;
//     }

//     public async update(id: number, data: TAddReviews): Promise<[affectedCount: number]> {
//         const response = await ReviewsModel.update(data, {
//             where: {
//                 id,
//             },
//         });
//         return response;
//     }

//     public async delete(ids: number[]): Promise<number> {
//         const response = await ReviewsModel.destroy({
//             where: {
//                 id: ids,
//             },
//         });
//         return response;
//     }
// }
