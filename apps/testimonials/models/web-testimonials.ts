const { Op } = require("sequelize");
import {
    TTestimonialsFiltersFrontend,
    TTestimonialsList,
} from "../../../types/testimonials";
import { Testimonials } from "../../../database/schema";

export class TestimonialsModel {
    constructor() { }


    public async list(filters: TTestimonialsFiltersFrontend): Promise<TTestimonialsList | any> {
        const total = await Testimonials.count({
            where: {
                testimonial_text: {
                    [Op.like]: `%${filters.search}%`,
                },
                rating: {
                    [Op.gt]: filters.rating
                },
                approved: 1
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
                rating: {
                    [Op.gt]: filters.rating
                },
                approved: 1
            },
        });
        return { total, data };
    }
}
