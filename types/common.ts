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
        franchiseId?: number;
        region?: string;
        [key: string]: any;
    };
};

export type TListFiltersRegions = {
    offset: number;
    limit: number;
    search?: string;
    sorting?: any;
    trashOnly?: string;
    filters?: {
        id?: number;
        title?: string;
        area?: string;
        createdBy?: number;
        [key: string]: any;
    };
};

export type TListFiltersAreas = {
    offset: number;
    limit: number;
    search?: string;
    sorting?: any;
    trashOnly?: string;
    filters?: {
        id?: number;
        title?: string;
        createdBy?: number;
        [key: string]: any;
    };
};

export type TListFiltersLeads = {
    offset: number;
    limit: number;
    search?: string;
    sorting?: any;
    trashOnly?: string;
    filters?: {
        status,
        source,
        campaign,
        region,
        state,
        date,
        assignee,
        followUpDate,
        affiliate,
        amountRange,
        quickActionFilter,
        [key: string]: any;
    };
};
