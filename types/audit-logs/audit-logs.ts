const { OrderItem } = require("sequelize");

// Analyticss type Starts
export type TAnalytics = {
  id: number;
  user_id: number;
  description: string;
  activity_type: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TAddAnalytics = {
  name: string;
  active: number;
};

export type TAnalyticssList = {
  total: number;
  data: TAnalytics;
};

export type TAnalyticsFilters = {
  offset: number;
  limit: number;
  search?: string;
  sorting?: typeof OrderItem;
  trashOnly?: string;
};
// Analyticss type Ends