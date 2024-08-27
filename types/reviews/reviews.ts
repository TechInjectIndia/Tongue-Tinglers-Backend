const { OrderItem } = require("sequelize");

// Reviews type Starts
export type TReviews = {
  id: number;
  review_text: string;
  rating: number;
  approved: number;
  item_id: number;
  item_type: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TAddReviews = {
};

export type TReviewssList = {
  total: number;
  data: TReviews;
};

export type TReviewsFilters = {
  offset: number;
  limit: number;
  search?: string;
  sorting?: typeof OrderItem;
  trashOnly?: string;
};
// Reviews type Ends