const { OrderItem } = require("sequelize");

export * from './admin-user';
export * from './roles';
export * from './permissions';
export * from './franchisee';
export * from './profile';
export * from './settings';

export type TQueryFilters = {
    offset: number;
    limit: number;
    search?: string;
    sorting?: typeof OrderItem;
    trashOnly?: string;
};

export type TListFiltersContract = {
    offset: number;
    limit: number;
    search?: string;
    sorting?: any;
    trashOnly?: string;
    filters?: {
        status,
        min_price,
        max_price,
        region,
        due_date,
        assignee
    };
};
