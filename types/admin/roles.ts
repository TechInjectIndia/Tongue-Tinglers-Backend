const { OrderItem } = require("sequelize");

// Role type Starts
export type TRole = {
  id: number;
  name: string;
  role_permissions: object;
  active: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TAddRole = {
  name: string;
  active: number;
  role_permissions: object;
};

export type TRolesList = {
  total: number;
  data: TRole;
};

export type TRoleFilters = {
  offset: number;
  limit: number;
  search?: string;
  sorting?: typeof OrderItem;
  trashOnly?: string;
};
// Role type Ends