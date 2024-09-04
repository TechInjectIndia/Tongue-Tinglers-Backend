const { OrderItem } = require("sequelize");

// Reviews type Starts
export type TReviews = {
  id: number;
  user_id: number;
  review_text: string;
  rating: number;
  approved: number;
  review_date: Date;
  item_id: number;
  item_type: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TAddReviews = {
};
export type TEditReviews = {
};

export type TReviewssList = {
  total: number;
  data: TReviews[];
};

export type TReviewsFilters = {
  offset: number;
  limit: number;
  search?: string;
  sorting?: typeof OrderItem;
  trashOnly?: string;
};
// Reviews type Ends