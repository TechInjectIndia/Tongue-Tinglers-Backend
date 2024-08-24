const { OrderItem } = require("sequelize");

export type TListFilters = {
    offset: number;
    limit: number;
    search?: string;
    sorting?: typeof OrderItem;
    trashOnly?: string;
};