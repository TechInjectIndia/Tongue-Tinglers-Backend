const { OrderItem } = require("sequelize");

// AuditLogs type Starts
export type TAuditLog = {
  id: number;
  user_id: number;
  description: string;
  activity_type: string;
  updatedBy: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TAddAuditLog = {
  name: string;
  active: number;
};

export type TAuditLogsList = {
  total: number;
  data: TAuditLog;
};

export type TAuditLogFilters = {
  offset: number;
  limit: number;
  search?: string;
  sorting?: typeof OrderItem;
  trashOnly?: string;
};
// AuditLogs type Ends