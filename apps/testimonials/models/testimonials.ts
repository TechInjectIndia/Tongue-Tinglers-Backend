const { Op } = require("sequelize");
import {
    TTestimonials,
    TTestimonialsFilters,
    TTestimonialsList,
    TPayloadTestimonials,
    TListFilters
} from "../../../types";
import { TestimonialsModel } from "../../../database/schema";
import IBaseRepo from '../controllers/controller/ITestimonialsController';

export class TestimonialsRepo implements IBaseRepo<TTestimonials, TListFilters> {
    constructor() { }

    public async getTestimonialsByAttr(whereName: any, whereVal: any, getAttributes: any = ['*']): Promise<TTestimonials> {
        const whereAttributes = { [whereName]: whereVal }
        const data = await TestimonialsModel.findOne({
            raw: true,
            attributes: getAttributes,
            where: whereAttributes
        });
        return data;
    }

    public async list(filters: TTestimonialsFilters): Promise<TTestimonialsList> {
        const total = await TestimonialsModel.count({
            where: {
                testimonial_text: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await TestimonialsModel.findAll({
            order: [filters?.sorting],
            offset: filters.offset,
            limit: filters.limit,
            where: {
                testimonial_text: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        return { total, data };
    }

    public async create(data: TPayloadTestimonials): Promise<TTestimonials> {
        const response = await TestimonialsModel.create(data);
        return response;
    }

    public async update(id: number, data: TPayloadTestimonials): Promise<[affectedCount: number]> {
        const response = await TestimonialsModel.update(data, {
            where: {
                id,
            },
        });
        return response;
    }

    public async delete(ids: number[]): Promise<number> {
        const response = await TestimonialsModel.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
