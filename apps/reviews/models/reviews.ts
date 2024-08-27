const { Op } = require("sequelize");
import {
    TReviews,
    TReviewsFilters,
    TReviewssList,
    TAddReviews,
} from "../../../types/reviews";
import { Reviews } from "../../../database/schema";

export class ReviewsModel {
    constructor() { }

    public async getReviewsByAttr(whereName: any, whereVal: any, getAttributes: any = '*'): Promise<TReviews | any> {
        const whereAttributes = { [whereName]: whereVal }
        const data = await Reviews.findOne({
            raw: true,
            attributes: getAttributes,
            where: whereAttributes
        });
        return data;
    }

    public async list(filters: TReviewsFilters): Promise<TReviewssList | any> {
        const total = await Reviews.count({
            where: {
                review_text: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await Reviews.findAll({
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

    public async add(data: TAddReviews): Promise<TReviews | any> {
        const response = await Reviews.create(data);
        return response;
    }

    public async update(id: number, data: TAddReviews): Promise<TReviews | any> {
        const response = await Reviews.update(data, {
            where: {
                id,
            },
        });
        return response;
    }

    public async delete(ids: number[]): Promise<TReviews | any> {
        const response = await Reviews.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
