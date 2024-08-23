const { OrderItem } = require("sequelize");

// FollowUp type Starts
export type TFollowUp = {
    id: number;
    title: string;
    description: string;
    type: string;
    datetime: Date;
    status: number;
    createdAt: Date;
    updatedAt: Date;
};

export type TAddFollowUp = {
    title: string;
    description: string;
    type: string;
    datetime: Date;
    status: number;
};

export type TFollowUpsList = {
    total: number;
    data: TFollowUp;
};

export type TFollowUpFilters = {
    offset: number;
    limit: number;
    search?: string;
    sorting?: typeof OrderItem;
    trashOnly?: string;
};
// FollowUp type Ends