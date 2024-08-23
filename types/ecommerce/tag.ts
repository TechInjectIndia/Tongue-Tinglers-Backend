const { OrderItem } = require("sequelize");

// Tag type Starts
export type TTag = {
  id: number;
  name: string;
  slug: string;
  description: string;
  active: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TAddTag = {
  name: string;
  slug: string;
  description: string;
  active: number;
};

export type TTagsList = {
  total: number;
  data: TTag;
};

export type TTagFilters = {
  offset: number;
  limit: number;
  search?: string;
  sorting?: typeof OrderItem;
  trashOnly?: string;
};
// Tag type Ends