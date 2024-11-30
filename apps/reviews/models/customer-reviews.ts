const { Op } = require("sequelize");
import {
    TReviews,
    TReviewsFilters,
    TReviewssList,
    TAddFranchiseReviews,
} from "../../../types/reviews";
import { ReviewsModel } from "../../../database/schema";
import IBaseRepo from '../controllers/controller/ICustomerReviewsController';

export class CustomerReviewsRepo implements IBaseRepo<TReviews, TReviewsFilters> {
    constructor() { }

    public async getReviewsByAttr(whereName: string, whereVal: any, getAttributes: any = ['*']): Promise<TReviews | null> {
        const whereAttributes = { [whereName]: whereVal }
        const data = await ReviewsModel.findOne({
            raw: true,
            attributes: getAttributes,
            where: whereAttributes
        });
        return data;
    }

    public async list(user_id: number, filters: TReviewsFilters): Promise<TReviewssList> {
        const total = await ReviewsModel.count({
            where: {
                review_text: {
                    [Op.iLike]: `%${filters.search}%`,
                },
                user_id: user_id
            },
        });
        const data = await ReviewsModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                review_text: {
                    [Op.iLike]: `%${filters.search}%`,
                },
                user_id: user_id
            },
        });
        return { total, data };
    }

    public async create(data: TAddFranchiseReviews): Promise<TReviews> {
        const response = await ReviewsModel.create(data);
        return response;
    }
}
