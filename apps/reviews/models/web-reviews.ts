const { Op } = require("sequelize");
import {
    TReviews,
    TReviewsFilters,
    TReviewssList,
} from "../../../types/reviews";
import { ReviewsModel } from "../../../database/schema";
import IBaseRepo from '../controllers/controller/IWebReviewsController';

export class ReviewsRepo implements IBaseRepo<TReviews, TReviewsFilters> {
    constructor() { }

    public async list(filters: TReviewsFilters): Promise<TReviewssList> {
        const total = await ReviewsModel.count({
            where: {
                review_text: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await ReviewsModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                review_text: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        return { total, data };
    }
}
