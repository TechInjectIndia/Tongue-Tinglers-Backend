const { OrderItem } = require("sequelize");

export type TListFilters = {
    offset: number;
    limit: number;
    search?: string;
    sorting?: typeof OrderItem;
    trashOnly?: string;
};

export type TListFiltersCampaigns = {
    offset: number;
    limit: number;
    search?: string;
    sorting?: any;
    trashOnly?: string;
    filters?: {
        franchiseId?: string;
        region?: string;
        [key: string]: any;
    };
};