const { OrderItem } = require("sequelize");

export type TTestimonials = {
  id: number;
  user_id: string;
  testimonial_text: string;
  rating: number;
  item_id: string;
  item_type: string;
  date_submitted: Date;
  approved: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TPayloadTestimonials = {
  rating: number,
  approved: number,
  user_id: string;
  date_submitted: Date;
  testimonial_text: string;
  item_id: string;
  item_type: string;
};

export type TTestimonialsList = {
  total: number;
  data: TTestimonials[];
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