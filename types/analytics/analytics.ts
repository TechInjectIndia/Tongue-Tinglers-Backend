const { OrderItem } = require("sequelize");

// Analytics type Starts
export type TAnalytics = {
  id: number;
  city: string,
  state: string,
  zip_code: string,
  country: string,
  phone_number: string,
  email: string,
  address: string,
  additional_info: string,
  status: number,
  createdAt: Date;
  updatedAt: Date;
};

export type TAddAnalytics = {
  city: string,
  state: string,
  zip_code: string,
  country: string,
  phone_number: string,
  email: string,
  address: string,
  additional_info: string,
  status: number,
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
// Analytics type Ends