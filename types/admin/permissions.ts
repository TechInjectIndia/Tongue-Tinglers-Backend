const { OrderItem } = require("sequelize");

// Permissions type Starts
export type TPermission = {
  id: number;
  name: string;
  active: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TAddPermission = {
  name: string;
  active: number;
};

export type TPermissionsList = {
  total: number;
  data: TPermission;
};

export type TPermissionFilters = {
  offset: number;
  limit: number;
  search?: string;
  sorting?: typeof OrderItem;
  trashOnly?: string;
};
// Permissions type Ends