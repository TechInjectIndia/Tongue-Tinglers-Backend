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
  user_id: number;
  review_text: string;
  rating: number;
  item_id: number;
  item_type: string;
  approved: number;
  review_date: Date;
};

export type TAddCustomerReviews = {
  user_id: number;
  review_text: string;
  rating: number;
  item_id: number;
  item_type: string;
  approved: number;
  review_date: Date;
};

export type TAddFranchiseReviews = {
  user_id: number;
  review_text: string;
  rating: number;
  item_id: number;
  item_type: string;
  approved: number;
  review_date: Date;
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