const { Op } = require("sequelize");
import {
    TTestimonialsFiltersFrontend,
    TTestimonialsList,
    TTestimonials,
    TPayloadTestimonials
} from "../../../types";
import { TestimonialsModel } from "../../../database/schema";
import IBaseRepo from '../controllers/controller/IFranchiseTestimonialsController';

export class FranchiseTestimonialsRepo implements IBaseRepo<TTestimonials, TTestimonialsFiltersFrontend> {
    constructor() { }

    public async getTestimonialsByAttr(whereName: any, whereVal: any, getAttributes: any = ['*']): Promise<TTestimonials | null> {
        const whereAttributes = { [whereName]: whereVal }
        const data = await TestimonialsModel.findOne({
            raw: true,
            attributes: getAttributes,
            where: whereAttributes
        });
        return data;
    }

    public async create(data: TPayloadTestimonials): Promise<TTestimonials> {
        const response = await TestimonialsModel.create(data);
        return response;
    }

    public async list(filters: TTestimonialsFiltersFrontend): Promise<TTestimonialsList> {
        const total = await TestimonialsModel.count({
            where: {
                testimonial_text: {
                    [Op.iLike]: `%${filters.search}%`,
                },
                rating: {
                    [Op.gt]: filters.rating
                },
            },
        });
        const data = await TestimonialsModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                testimonial_text: {
                    [Op.iLike]: `%${filters.search}%`,
                },
                rating: {
                    [Op.gt]: filters.rating
                },
                approved: 1
            },
        });
        return { total, data };
    }
}
