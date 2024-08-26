const { Op } = require("sequelize");
import {
    TTestimonials,
    TTestimonialsFilters,
    TTestimonialsList,
    TAddTestimonials,
} from "../../../types/testimonials";
import { Testimonials } from "../../../database/schema";

export class TestimonialsModel {
    constructor() { }

    public async getTestimonialsByAttr(whereName: any, whereVal: any, getAttributes: any = '*'): Promise<TTestimonials | any> {
        const whereAttributes = { [whereName]: whereVal }
        const data = await Testimonials.findOne({
            raw: true,
            attributes: getAttributes,
            where: whereAttributes
        });
        return data;
    }

    public async list(filters: TTestimonialsFilters): Promise<TTestimonialsList | any> {
        const total = await Testimonials.count({
            where: {
                testimonial_text: {
                    [Op.like]: `%${filters.search}%`,
                },
            },
        });
        const data = await Testimonials.findAll({
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

    public async add(data: TAddTestimonials): Promise<TAddTestimonials | any> {
        const response = await Testimonials.create(data);
        return response;
    }

    public async update(id: number, data: TAddTestimonials): Promise<TTestimonials | any> {
        const response = await Testimonials.update(data, {
            where: {
                id,
            },
        });
        return response;
    }

    public async delete(ids: number[]): Promise<TTestimonials | any> {
        const response = await Testimonials.destroy({
            where: {
                id: ids,
            },
        });
        return response;
    }
}
