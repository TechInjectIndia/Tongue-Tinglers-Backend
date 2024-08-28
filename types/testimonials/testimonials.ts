const { OrderItem } = require("sequelize");

// Testimonials type Starts
export type TTestimonials = {
  testimonial_text: string,
  rating: number,
  date_submitted: string,
  approved: number,
  testimonial_type: number,
};

export type TAddTestimonials = {
  testimonial_text: string,
  rating: number,
  date_submitted: string,
  approved: number,
  testimonial_type: number,
};

export type TTestimonialsList = {
  total: number;
  data: TTestimonials;
};

export type TTestimonialsFilters = {
  offset: number;
  limit: number;
  search?: string;
  sorting?: typeof OrderItem;
  trashOnly?: string;
};

export type TTestimonialsFiltersFrontend = {
  offset: number;
  limit: number;
  rating: number;
  search?: string;
  sorting?: typeof OrderItem;
  trashOnly?: string;
};
// Testimonials type Ends