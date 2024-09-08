const { OrderItem } = require("sequelize");

export type TRole = {
  id: number;
  name: string;
  role_permissions: string;
  description: string;
  active: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TEditRole = {
  name: string;
  active: number;
  role_permissions: string;
  description: string;
};

export type TAddRole = {
  name: string;
  active: number;
  role_permissions: string;
  description: string;
};

export type TRolesList = {
  total: number;
  data: TRole[];
};

export type TRoleFilters = {
  offset: number;
  limit: number;
  search?: string;
  sorting?: typeof OrderItem;
  trashOnly?: string;
};